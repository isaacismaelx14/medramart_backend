export interface IResponse {
  token?: string;
  suscess: boolean;
  error: errors[] | [];
}

type errors = {
  message: string;
};

export const typeDefs = `
    type Query {
        ping: String!
        
        services: [Service!]!
        service(id: Int!): Service!
        categories: [Category!]!

        tickets: [Ticket!]!
        ticket(uuid: String!): Ticket!

        users: [User!]!
    }

    type Service {
        id: ID!
        name: String!
        description: String
        duration: Int
        category: String
        price: Float
        createdAt: String
        createdBy: Int!
        updatedAt: String
        updatedBy: Int
    }

    type Category{
        id: ID!
        name: String!
        services: [Service!]!
    }

    type Ticket{
        uuid: String!
        service: Service!
        user: Int!
        created_at: String
    }

    type User {
        uuid: String!
        email: String!
        password: String!
        name: String!
        type: String!
        created_at: String
        updated_at: String
    }

    type Response{
        token: String
        suscess: Boolean!
        error: [Error!]
    }

    type Error{
        message: String!
    }

    type Mutation {
        createService(name: String!, description: String, duration: Int, category: Int, price: Float, createdBy: Int!): Service
        createTicket(service: Int!, user: Int!): Ticket
        createUser(email: String!, password: String!, name: String!, type: String): Boolean
        createCategory(name: String!): Response

        updateService(id: Int!, name: String, description: String, duration: Int, category: Int, price: Float, updatedBy: Int!): Boolean
        updateCategory(name: String!, id: Int!): Response

        deleteService(id: Int!): Boolean
        deleteUser(uuid: String!): Boolean
        deleteCategory(id: Int!): Response

        login(email: String!, password: String!): Response
    }
    
`;
