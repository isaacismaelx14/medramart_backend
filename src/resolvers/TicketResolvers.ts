import { Tickets } from "../entity/tickets";
import { Services } from "../entity/services";
import { GenerateID } from "../helpers/generateId";


export const TicketResolvers = {
  Query: {
    tickets: async () => await Tickets.find(),
    ticket: async (_: any, { uuid }: Tickets) => await Tickets.findOne(uuid),
  },
  Mutation: {
    createTicket: async (_: any, input: Tickets) => {
      const uuid = GenerateID("CL");
      const ticket = await Tickets.create({
        ...input,
        uuid,
      });
      await ticket.save();
      return ticket;
    },
  },

  Ticket: {
    service: async (ticket: Tickets) =>
      await Services.findOne(ticket.service_id),
  },
};
