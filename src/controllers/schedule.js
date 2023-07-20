const scheduleServices = require("../services/scheduleServices")
const { statusReturn } = require("../untils/statusReturn")
const { v4: uuidv4 } = require('uuid');


const GetSchedule = async (req, res) => {
  try {
    const result = await scheduleServices.ScheduleServicesHost(req.body.HostId);
    if (result?.error) {
      return statusReturn(res, 400, { message: 'error' }, result?.error);
    }

    return res.status(200).json(result);
  } catch (error) {
    return statusReturn(res, 400, { error }, error)
  }
}

const DeleteSchedule = async (req, res) => {
  try {
    const result = await scheduleServices.DeleteScheduleHost(req.body.EventId);
    if (result?.error) {
      return statusReturn(res, 400, { message: 'error' }, result?.error);
    }

    return res.status(200).json(result);
  } catch (error) {
    return statusReturn(res, 400, { error }, error)
  }
}

const ModifierSchedule = async (req, res) => {
  try {
    const result = await scheduleServices.ModifierScheduleHost(req.body.data, req.body.EventId);

    if (result?.error) {
      return statusReturn(res, 400, { message: 'error' }, result?.error);
    }


    return res.status(200).json(result);
  } catch (error) {
    return statusReturn(res, 400, { error }, error)
  }
}

const CreateSchedule = async (req, res) => {
  try {
    const result = await scheduleServices.CreateEvent({
      ...req.body, EventId: uuidv4(),
      HouseId: req?.body?.HouseId !== '' ? req?.body?.HouseId : null,
      UserId: req?.body?.UserId !== '' ? req?.body?.UserId : null
    });
    if (result?.error) {
      return statusReturn(res, 400, { message: 'error' }, result?.error);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return statusReturn(res, 400, { error }, error)
  }

}


module.exports = {
  GetSchedule: GetSchedule,
  DeleteSchedule: DeleteSchedule,
  ModifierSchedule: ModifierSchedule,
  CreateSchedule: CreateSchedule,
}