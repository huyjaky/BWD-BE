const db = require("../models");



const ScheduleServicesHost = async (HostId) => {
  try {
    const schedule = await db.schedule.findAll({
      where: { Host: HostId },
      include: [
        {
          model: db.house,
          required: true,
          include: [
            {
              model: db.address,
              required: true
            }
          ]
        }
      ]
    })

    let extendedSchedule = await Promise.all(
      schedule.map(async (item) => {
        const arrImg = await handleFetchImg(item.HouseId);
        return { ...item.toJSON(), house: { ...item.toJSON().house, arrImg } }
      })
    );

    return extendedSchedule;
  } catch (error) {
    console.log(error);
    return { error }
  }
}

const handleFetchImg = async (HouseId) => {
  try {
    let getHouseImg = await db.img.findAll({
      attributes: ["Path"],
      include: [
        {
          model: db.manageimg,
          required: true,
          attributes: [],
          include: [
            {
              model: db.house,
              required: true,
              where: { HouseId: HouseId },
              attributes: [],
            },
          ],
        },
      ],
    });
    return getHouseImg;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const DeleteScheduleHost = async (EventId) => {
  try {

    const deleteSchedule = await db.schedule.destroy({ where: { EventId: EventId } });
    return deleteSchedule;
  } catch (error) {
    console.log(error);
    return { error }
  }
}

const ModifierScheduleHost = async (data, EventId) => {
  try {
    const entity = await db.schedule.findOne({ where: { EventId: EventId} });
    console.log('data', data);
    console.log('entity', entity);
    if (entity) {
      await entity.update(data);
      return true;
    }

  } catch (error) {
    console.log(error);
    return { error };
  }
}

const CreateEvent = async (data_) => {
  try {
    const data = await db.schedule.create(data_);
    return data;
  } catch (error) {
    console.log(error);
    return { error }
  }
}

module.exports = {
  ScheduleServicesHost: ScheduleServicesHost,
  DeleteScheduleHost: DeleteScheduleHost,
  ModifierScheduleHost: ModifierScheduleHost,
  CreateEvent: CreateEvent
}