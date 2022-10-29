const { Router } = require('express');
const { getNews, getSportsNews } = require('../controllers/newsController');

const router = Router();

router.get('/', getNews)
router.get('/sports', getSportsNews)

module.exports = router;