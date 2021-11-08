// Write your "projects" router here!

const server = require("../server");
const models = require("./projects-model");
const middleware = require("./projects-middleware");

server.get("/api/projects", async (req, res) => {
  return res.send(await models.get());
});

server.get("/api/projects/:id", async ({ params }, res) => {
  const project = await models.get(params.id);
  if (project) {
    return res.send(project);
  }
  return res.sendStatus(404);
});

server.post("/api/projects", middleware.validateBody, async (req, res) => {
  return res.send(await models.insert(req.body));
});

server.put("/api/projects/:id", middleware.validateBody, async (req, res) => {
  const updatedRecord = await models.update(req.params.id, req.body);
  if (!updatedRecord) {
    return res.sendStatus(404);
  }
  return res.send(updatedRecord);
});

server.delete("/api/projects/:id", async (req, res) => {
  const deletedRecord = await models.remove(req.params.id);
  if (!deletedRecord) {
    return res.sendStatus(404);
  }
  return res.send();
});

server.get("/api/projects/:id/actions", async (req, res) => {
  const project = await models.get(req.params.id);
  if (!project) {
    return res.sendStatus(404);
  }
  const actions = await models.getProjectActions(req.params.id);
  return res.send(actions);
});