import express from 'express';

const router = express.Router();
  
router.get('/activities', async function(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const filters = {
      userId: req.query.userId,
      eventType: req.query.eventType
    };
    
    const result = await req.app.locals.activityUseCases.getActivities(filters, limit, offset);
    res.json({
      success: true,
      data: result.data,
      total: result.total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/activities/user/:userId', async function(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const filters = { userId: req.params.userId };
    
    const result = await req.app.locals.activityUseCases.getActivities(filters, limit, offset);
    res.json({
      success: true,
      data: result.data,
      total: result.total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/activities', async function(req, res) {
  try {
    await req.app.locals.activityUseCases.publishActivity(req.body);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/health', function(req, res) {
  res.json({ status: 'ok' });
});

export default router;
