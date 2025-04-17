import { Types } from "mongoose";

// TODO: figure out where to put this since it is also used for other controllers
const ObjectId = Types.ObjectId;

function isValidMongooseId(id) {
  console.log(id);
  if (id.length != 24 || !isNaN(Number(id))) {
    return false;
  }
  const mongooseId = new ObjectId(id);
  return ObjectId.isValid(mongooseId);
}

export default isValidMongooseId;
