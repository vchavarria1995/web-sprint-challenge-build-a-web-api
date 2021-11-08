// Write your "actions" router here!

const server = require("../server");
const projectModels = require("../projects/projects-model");
const models = require("./actions-model");
const middleware = require("./actions-middleware");

server.get("/api/actions", async (req, res) => {
  return res.send(await models.get());
});

server.get("/api/actions/:id", async (req, res) => {
  const action = await models.get(req.params.id);
  if (!action) {
    return res.sendStatus(404);
  }
  return res.send(action);
});

server.post("/api/actions", middleware.validateBody, async (req, res) => {
  const project = await projectModels.get(req.body.project_id);
  if (!project) {
    return res.sendStatus(400);
  }
  const action = await models.insert(req.body);
  return res.send(action);
});

server.put("/api/actions/:id", middleware.validateBody, async (req, res) => {
  const project = await projectModels.get(req.body.project_id);
  if (!project) {
    return res.sendStatus(400);
  }

  const action = await models.update(req.params.id, req.body);
  if (!action) {
    return res.sendStatus(404);
  }
  return res.send(action);
});

server.delete("/api/actions/:id", async (req, res) => {
  const action = await models.get(req.params.id);
  if (!action) {
    return res.sendStatus(404);
  }
  await models.remove(req.params.id);
  return res.send();
});