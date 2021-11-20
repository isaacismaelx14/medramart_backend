import { Users } from "../entity/users";

export const activationMail = (data: Users) => ({
  from: "MedraMart Signup <testdevgmlc@gmail.com>",
  to: data.email,
  subject: "Welcome to MedraMart",
  html: `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.0/css/bootstrap.min.css" />

        <h1 class="mb-2">Welcome to MedraMart, ${data.name}</h1>
        <p>You can follow this link to activate your account:
            <a href="http://localhost:4000/validate/${data.accountCode}?id=${data.uuid}">activate now</a>
        </p>
        <p>Thank you for joining us</p>
        <p>MedraMart</p>
          `,
});
