var express = require('express');
var router = express.Router();
var db = require('./sql.js');

// DELETE route to remove a specific comment
router.delete('/comment/:id', function (req, res) {
    const commentId = req.params.id;

    // 执行删除操作
    db.query('DELETE FROM comment where comment = ?', [commentId], function (err, result) {
        if (err) {
            console.error('Error deleting comment:', err);
            return res.status(500).json({ success: false, message: '服务器错误，请重试。' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: '评论未找到' });
        }

        console.log('Comment deleted successfully');
        res.json({ success: true, message: '评论删除成功！' });
    });
});

module.exports = router;