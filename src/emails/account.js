const sgMail = require('@sendgrid/mail')

const sendgridAPIkey = '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'

sgMail.setApiKey(sendgridAPIkey)

sgMail.send({
  to: 'andrew@mead.io',
  from: 'andrew@mead.io',
  subject: 'This is my first creation!',
  text: 'I hope this one actually get to you.'
})
