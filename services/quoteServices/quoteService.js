const quoteDao = require("../../dao/quoteDao/quoteDao");
const visitorDao = require("../../dao/visitorDao/visitorDao");
const emailTemplateDao = require("../../dao/emailTemplateDao/emailTemplateDao");
const emailService = require("./emailService");
const emailTemplatesStructure = require("../../utils/emailTemplatesStructure");

const createQuote = async (quoteData) => {
  let id = quoteData.id_visitor;
  const quote = await quoteDao.createQuote(quoteData);
  let email = await prepareAfterQuoteCreationEmail(id, quote);
  await emailService.sendEmail(email);
  return quote;
};

const getQuotes = async () => {
  return await quoteDao.getQuotes();
};

const updateQuote = async (id, updateData) => {
  return await quoteDao.updateQuote(id, updateData);
};

const deleteQuote = async (id) => {
  return await quoteDao.deleteQuote(id);
};

const sendBookingEmail = async (bookingData) => {
  let id = bookingData.id_visitor;
  let price = bookingData.price;
  let quote_id = bookingData.quote_id;
  await quoteDao.updateQuotePrice(quote_id, price)
  let quote = await quoteDao.getQuoteById(quote_id);
  let url = 'http://localhost:3000/api/quote/confirm-booking/' + quote_id;
  let email = await prepareQuoteBookingEmail(id, price, url, quote);
  await emailService.sendEmail(email);
  return "Booking Email sent!";
};

const sendAssign = async (bookingData) => {
  // let id = bookingData.id_visitor;
  let price = bookingData.price;
  let quote_id = bookingData.quote_id;
  let driver = bookingData.id_driver;
  let vehicle = bookingData.id_vehicle;
  await quoteDao.updateQuoteDriver(quote_id, price, driver, vehicle)
  return "Driver and Vehicle Assigned!!";
};

const sendPaymentEmail = async (paymentData) => {
  let id = paymentData.id_visitor;
  let quote_id = paymentData.quote_id;
  let quote = await quoteDao.getQuoteById(quote_id);
  let url = 'http://localhost:3000/api/quote/quote-payment/4fe5t1g44f6d5f748ds654fs97fsd4fs8df764h6j78ty';
  let email = await prepareQuotePaymentEmail(id, url, quote);
  await emailService.sendEmail(email);
  return "Payment Email sent!";
};

async function prepareAfterQuoteCreationEmail(idVisitor, quote) {
  let visitor = await visitorDao.getVisitorById(idVisitor);
  let recipient = visitor.email;
  //const email = await emailTemplateDao.getEmailTemplateByName('visitor quote reception');
  const creationDate = quote.createdAt;

  const formattedCreationDate = creationDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  let selectedTemplate = "";
  switch (quote.type) {
    case "One way":
      selectedTemplate =
        emailTemplatesStructure.emailTemplates.one_way_quote_received(
          visitor,
          quote,
          formattedCreationDate
        );
      break;
    case "Return":
      selectedTemplate =
        emailTemplatesStructure.emailTemplates.with_return_quote_received(
          visitor,
          quote,
          formattedCreationDate
        );
      break;
    default:
      console.log("Wrong type");
  }
  let emailBody = selectedTemplate;
  let emailSubject = "Quote Request Received";
  let fullEmailObject = {
    to: recipient,
    subject: emailSubject,
    body: emailBody,
  };
  return fullEmailObject;
};

async function prepareQuoteBookingEmail(idVisitor, price, url, quote) {
  let visitor = await visitorDao.getVisitorById(idVisitor);
  let recipient = visitor.email;
  const creationDate = quote.createdAt;

  const formattedCreationDate = creationDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  let emailBody = emailTemplatesStructure.emailTemplates.booking(
    visitor,
    price,
    url,
    quote,
    formattedCreationDate
  );
  let emailSubject = "Booking Processed";
  let fullEmailObject = {
    to: recipient,
    subject: emailSubject,
    body: emailBody,
  };
  return fullEmailObject;
};

async function prepareQuotePaymentEmail(idVisitor, url, quote) {
  let visitor = await visitorDao.getVisitorById(idVisitor);
  let recipient = visitor.email;
  const creationDate = quote.createdAt;

  const formattedCreationDate = creationDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  let emailBody = emailTemplatesStructure.emailTemplates.payment(
    visitor,
    url,
    quote,
    formattedCreationDate
  );
  let emailSubject = "Payment Process";
  let fullEmailObject = {
    to: recipient,
    subject: emailSubject,
    body: emailBody,
  };
  return fullEmailObject;
};

const updateQuoteStatus = async (id) => {
  return await quoteDao.updateQuoteStatus(id);
};

module.exports = {
  createQuote,
  getQuotes,
  updateQuote,
  deleteQuote,
  sendBookingEmail,
  updateQuoteStatus,
  sendPaymentEmail,
  sendAssign
};
