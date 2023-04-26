const path = require('path')
const db = require('../db/index')
const { articleList } = require('../utils/filterData')

// 发布文章
module.exports.addArticle = (req, res) => {
  if (!req.file || req.file.fieldname !== 'cover_img') return res.errHandler('文章封面为必选参数！')
  const articleInfo = {
    ...req.body,
    cover_img: path.join('/static', req.file.filename),
    pub_date: parseInt(new Date() / 1000),
    author_id: req.user.id
  }

  // 查询输入的字段是否存在于数据库中，不允许重复
  const selectSql = 'select * from ev_articles where title = ? or content = ?'
  db.query(selectSql, [articleInfo.title, articleInfo.content], (err, results) => {
    if (err) return res.errHandler(err)
    if (results.length !== 0) return res.errHandler('标题或内容被占用，请更换后重试！')

    const insertSql = 'insert into ev_articles set ?'
    db.query(insertSql, articleInfo, (err, results) => {
      if (err) return res.errHandler(err)
      if (results.affectedRows !== 1) return res.errHandler('发布文章失败！')

      res.send({
        code: 0,
        msg: '发布文章成功！'
      })
    })
  })
}

// 文章列表
module.exports.articleList = (req, res) => {
  const sql = articleList(req.body, 'ev_articles')

  db.query(sql, (err, rows) => {
    if (err) return res.errHandler(err)

    const sql = 'select count(*) as total from ev_articles where is_delete = 0'
    db.query(sql, (err, data) => {
      if (err) return res.errHandler(err)

      res.send({
        code: 0,
        msg: '获取文章列表成功！',
        data: {
          total: data[0]['total'],
          entries: rows
        }
      })
    })
  })
}

// 删除文章
module.exports.delArticle = (req, res) => {
  const sql = 'update ev_articles set is_delete = 1 where id = ?'

  db.query(sql, req.body.id, (err, results) => {
    if (err) return res.errHandler(err)
    if (results.affectedRows !== 1) return res.errHandler('删除文章失败！')

    res.send({
      code: 0,
      msg: '删除文章成功！'
    })
  })
}

// 修改文章
module.exports.updateArticle = (req, res) => {
  if (!req.file || req.file.fieldname !== 'cover_img') return res.errHandler('文章封面为必选参数！')

  const articleInfo = {
    ...req.body,
    cover_img: path.join('/static', req.file.filename),
    pub_date: parseInt(new Date() / 1000),
    author_id: req.user.id
  }

  const sql = 'select * from ev_articles where id = ?'
  db.query(sql, req.body.id, (err, results) => {
    if (err) return res.errHandler(err)
    if (results.length <= 0) return res.errHandler('id异常')

    const selectSql = 'select * from ev_articles where title = ? or content = ?'
    // 查询输入的字段是否存在于数据库中，不允许重复
    db.query(selectSql, [req.body.title, req.body.content], (err, results) => {
      if (err) return res.errHandler(err)
      if (results.length !== 0) return res.errHandler('标题或内容被占用，请更换后重试！')

      const updateSql = 'update ev_articles set ? where id = ?'
      db.query(updateSql, [articleInfo, req.body.id], (err, results) => {
        if (err) return res.errHandler(err)
        if (results.affectedRows !== 1) return res.errHandler('更新文章分类失败！')

        res.send({
          code: 0,
          msg: '更新文章成功！'
        })
      })
    })
  })
}

// 文章详情
module.exports.articleDetail = (req, res) => {
  const sql = 'select * from ev_articles where id = ?'

  db.query(sql, req.body.id, (err, results) => {
    if (err) return res.errHandler(err)
    if (results.length !== 1) return res.errHandler('获取文章详情失败！')

    res.send({
      code: 0,
      msg: '获取文章详情成功！',
      data: results[0]
    })
  })
}