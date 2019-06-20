import { shareTypeObj } from 'cnxapp/src/containers/Conexion/constants';

export const individualConexionPayloadMapper = form => {
  const payload = {
    SharingType: null,
    ShortName: null,
    LastName: null,
    Name: null,
    MiddleName: null,
    Title: null,
    Suffix: null,
    ParentConexionId: null,
    JobTitle: null,
    Mobile1TelephoneNumber: null,
    Mobile2TelephoneNumber: null,
    HomeTelephoneNumber: null,
    Home2TelephoneNumber: null,
    HomeFaxNumber: null,
    BusinessTelephoneNumber: null,
    Business2TelephoneNumber: null,
    BusinessFaxNumber: null,
    PersonalEmailAddress: null,
    BusinessEmailAddress: null,
    PersonalHomePage: null,
    BusinessHomePage: null,
    Users: [],
  };
  if (form.ind_first_name) payload.Name = form.ind_first_name;
  if (form.ind_middle_name) payload.MiddleName = form.ind_middle_name;
  if (form.ind_last_name) payload.LastName = form.ind_last_name;
  if (form.ind_initial) payload.ShortName = form.ind_initial;
  if (form.ind_title) payload.Title = form.ind_title;
  if (form.ind_suffix) payload.Suffix = form.ind_suffix;
  if (form.ind_select_oraganisation)
    payload.ParentConexionId = form.ind_select_oraganisation;
  if (form.ind_job_title) payload.JobTitle = form.ind_job_title;
  if (form.ind_primary_mobile)
    payload.Mobile1TelephoneNumber = form.ind_primary_mobile;
  if (form.ind_secondary_mobile)
    payload.Mobile2TelephoneNumber = form.ind_secondary_mobile;
  if (form.ind_business_phone)
    payload.BusinessTelephoneNumber = form.ind_business_phone;
  if (form.ind_business_phone_2)
    payload.Business2TelephoneNumber = form.ind_business_phone_2;
  if (form.ind_business_fax) payload.BusinessFaxNumber = form.ind_business_fax;
  if (form.ind_business_email)
    payload.BusinessEmailAddress = form.ind_business_email;
  if (form.ind_business_home_page)
    payload.BusinessHomePage = form.ind_business_home_page;
  if (form.ind_home_phone) payload.HomeTelephoneNumber = form.ind_home_phone;
  if (form.ind_home_phone_2)
    payload.Home2TelephoneNumber = form.ind_home_phone_2;
  if (form.ind_hom_fax) payload.HomeFaxNumber = form.ind_hom_fax;
  if (form.ind_personal_email)
    payload.PersonalEmailAddress = form.ind_personal_email;
  if (form.ind_personal_home_page)
    payload.PersonalHomePage = form.ind_personal_home_page;

  if (form.ind_shared_type && form.ind_shared_type === shareTypeObj.SHARED) {
    payload.SharingType = form.ind_shared_type;
    if (form.ind_shared_users && form.ind_shared_users.length > 0)
      payload.Users = form.ind_shared_users;
  } else if (form.ind_shared_type) payload.SharingType = form.ind_shared_type;

  return payload;
};
