import Lo from 'lodash';

import { shareTypeObj } from 'cnxapp/src/containers/Conexion/constants';

export const editConexionMapper = data => {
  if (!Lo.isEmpty(data)) {
    const payload = {
      ind_first_name: data.Name,
      ind_middle_name: data.MiddleName,
      ind_last_name: data.LastName,
      ind_initial: data.ShortName,
      ind_title: data.Title,
      ind_suffix: data.Suffix,
      ind_select_oraganisation: data.Organization ? data.Organization.Id : null,
      ind_job_title: data.JobTitle,
      ind_primary_mobile: data.Mobile1TelephoneNumber,
      ind_secondary_mobile: data.Mobile2TelephoneNumber,
      ind_business_phone: data.BusinessTelephoneNumber,
      ind_business_phone_2: data.Business2TelephoneNumber,
      ind_business_fax: data.BusinessFaxNumber,
      ind_business_email: data.BusinessEmailAddress,
      ind_business_home_page: data.BusinessHomePage,
      ind_home_phone: data.HomeTelephoneNumber,
      ind_home_phone_2: data.Home2TelephoneNumber,
      ind_hom_fax: data.HomeFaxNumber,
      ind_personal_email: data.PersonalEmailAddress,
      ind_personal_home_page: data.PersonalHomePage,
      ind_shared_type: data.SharingType,
      ind_shared_users: [],
      //-----------
      // org_web_address: data.Addresses,
      org_shared_users: [],
      org_short_name: data.ShortName,
      org_name: data.Name,
      org_primary_phone: data.BusinessTelephoneNumber,
      org_secondary_phone: data.Business2TelephoneNumber,
      org_business_fax: data.BusinessFaxNumber,
      // org_shared_type: data.SharingType,
    };
    if (data.Users.length > 0) {
      data.Users.forEach(user => {
        if (!payload.ind_shared_users.includes(user.UserId.toString())) {
          payload.ind_shared_users.push(user.UserId.toString());
        }
        // if (!payload.org_shared_users.includes(user.UserId.toString())) {
        //   payload.org_shared_users.push(user.UserId.toString());
        // }
      });
    }
    return payload;
  }
  return {};
};

export const editOrganisationMapper = data => {
  if (!Lo.isEmpty(data)) {
    const payload = {
      org_web_address: data.BusinessHomePage,
      org_shared_users: [],
      org_short_name: data.ShortName,
      org_name: data.Name,
      org_primary_phone: data.BusinessTelephoneNumber,
      org_secondary_phone: data.Business2TelephoneNumber,
      org_business_fax: data.BusinessFaxNumber,
      // org_shared_type: '',
    };
    if (data.Users.length > 0) {
      data.Users.forEach(user => {
        if (!payload.org_shared_users.includes(user.UserId.toString())) {
          payload.org_shared_users.push(user.UserId.toString());
        }
      });
    }
    return payload;
  }
  return {};
};

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

export const organisationPayloadMappers = form => {
  const payload = {
    Addresses: null,
    ConexionId: null,
    DefaultConexion: null,
    ShortName: null,
    Name: null,
    BusinessTelephoneNumber: null,
    Business2TelephoneNumber: null,
    BusinessFaxNumber: null,
    BusinessHomePage: null,
    Status: null,
    CreatedBy: null,
    CreatedDate: null,
    UpdatedBy: null,
    LastUpdatedDate: null,
    ConexionKey: null,
    DisplayName: null,
    Users: [],
  };
  if (form.org_name) payload.Name = form.org_name;
  if (form.org_short_name) payload.ShortName = form.org_short_name;
  if (form.org_primary_phone)
    payload.BusinessTelephoneNumber = form.org_primary_phone;
  if (form.org_secondary_phone)
    payload.Business2TelephoneNumber = form.org_secondary_phone;
  if (form.org_business_fax) payload.BusinessFaxNumber = form.org_business_fax;
  if (form.org_web_address) payload.BusinessHomePage = form.org_web_address;
  if (form.org_shared_users && form.org_shared_users.length > 0)
    payload.Users = form.org_shared_users;
  return payload;
};
