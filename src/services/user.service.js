const { ServiceBroker } = require("moleculer");

const userService = {
  name: "user",
  actions: {
    create: {
      params: {
        name: "string",
        email: "string",
        phone: "string",
        gender: "string",
        hometown: "string",
      },
      handler(ctx) {
        return this.create(ctx.params);
      },
    },
    getAll: {
      handler(ctx) {
        return this.getAll();
      },
    },
  },
  methods: {
    create(user) {
      return new Promise((resolve, reject) => {
        this.entityValidator(user)
          .then(() => {
            this.entities.push(user);
            resolve();
          })
          .catch(reject);
      });
    },
    getAll() {
      return this.entities;
    },
  },
  entityValidator(user) {
    return new Promise((resolve, reject) => {
      if (!user.name) {
        return reject(new Error("Name is required"));
      }
      if (!user.email) {
        return reject(new Error("Email is required"));
      }
      resolve();
    });
  },
  entities: [],
};

const broker = new ServiceBroker({
  logger: console,
});

broker.createService(userService);

broker.start();

module.exports = broker;
