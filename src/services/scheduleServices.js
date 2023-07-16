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
        console.log(arrImg);
        return { ...item.toJSON(), house: {...item.toJSON().house, arrImg} }
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

const DeleteScheduleHost = async (HouseId) => {
  try {
    // const scheduel = await db.scheduel.findAll({
    //   where: {HouseId: HouseId}
    // })

    // if (scheduel.length > 0) {
    //   const deleteAllData = await Promise.all(
    //     scheduel.map((img) => img.destroy())
    //   );
    //   return deleteAllData;
    // }
    const deleteSchedule = await db.schedule.destroy({ where: { HouseId: HouseId } });
    return deleteSchedule;
  } catch (error) {
    console.log(error);
    return { error }
  }
}

const ModifierScheduleHost = async (data, id) => {
  try {
    const entity = await db.schedule.findOne({ where: { HouseId: id } });
    console.log('data', data);
    console.log('entity', entity);
    if (entity) {
      await entity.update({ Date: data });
      return true;
    }

  } catch (error) {
    console.log(error);
    return { error };
  }
}

const EditTitleHost = async (data, id) => {
  try {
    const entity = await db.schedule.findOne({ where: { HouseId: id } });
    console.log('data', data);
    console.log('entity', entity);
    if (entity) {
      await entity.update({ PhoneNumber: data });
      return true;
    }

  } catch (error) {
    console.log(error);
    return { error };
  }
}

module.exports = {
  ScheduleServicesHost: ScheduleServicesHost,
  DeleteScheduleHost: DeleteScheduleHost,
  ModifierScheduleHost: ModifierScheduleHost,
  EditTitleHost: EditTitleHost
}