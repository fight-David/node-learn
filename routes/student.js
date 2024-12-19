const express = require('express');
const router = express.Router();
const stuModel = require('../Models/stuModel');
const { body, validationResult } = require('express-validator');

// 获取所有学生信息：http://localhost:8089/student/search
router.get('/search', async (req, res, next) => {
    try {
        const result = await stuModel.findAll({ raw: true });
        res.json({
            code: 1001,
            msg: result,
        });
    } catch (err) {
        next(err);
    }
});

// 添加学生信息：http://localhost:8089/student/add
router.post('/add',
    // 配置验证规则
    [
        body('name').notEmpty().withMessage('姓名不能为空').bail()
            .isLength({ max: 30 }).withMessage('姓名不能超过30个字符').bail()
            .custom(async (value) => {
                const existingUser = await stuModel.findOne({ where: { name: value } });
                if (existingUser) {
                    return Promise.reject('该姓名已存在');
                }
            }),
        body('sex').notEmpty().withMessage('性别不能为空').bail()
            .isIn(['男', '女']).withMessage('性别必须为"男"或"女"'),
        body('email').optional({ checkFalsy: true }).isEmail().withMessage('邮箱格式不正确').bail()
            .custom(async (value) => {
                if (value) {
                    const existingEmail = await stuModel.findOne({ where: { email: value } });
                    if (existingEmail) {
                        return Promise.reject('该邮箱已被注册');
                    }
                }
            })
    ],
    async (req, res, next) => {

        try {
            // 检查是否有验证错误
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const { id, name, sex, email } = req.body;
            console.log(req.body);

            const result = await stuModel.create({ id, name, sex, email });
            res.json({
                code: 1001,
                msg: '插入成功',
            });
        } catch (err) {
            next(err);
        }
    }
);

// 删除学生信息：http://localhost:8089/student/delete
router.post('/delete', async (req, res, next) => {
    try {
        const { id } = req.body;
        await stuModel.destroy({ where: { id } });
        res.json({
            code: 1001,
            msg: '删除成功',
        });
    } catch (err) {
        next(err);
    }
});

// 更新某条信息：http://localhost:8089/student/update
router.put('/update', async (req, res, next) => {
    try {
        const { id, name, sex } = req.body;
        const user = await stuModel.findOne({ where: { id } });
        if (!user) {
            return res.json({
                code: 1002,
                msg: '查询失败',
            });
        }
        await user.update({ name, sex });
        res.json({
            code: 1001,
            msg: '更新成功',
        });
    } catch (err) {
        next(err);
    }
});

// 错误处理中间件
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        code: 1002,
        msg: '服务器发生错误',
    });
});

module.exports = router;