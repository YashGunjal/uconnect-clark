import appRouter from '../../site/appRouter.js';

appRouter.addGetController('/example', (req, res) => {
    res.json({
      message: "example message"
    })
})

appRouter.addPostController('/example', (req, res) => {
  res.status(201).send()
})
