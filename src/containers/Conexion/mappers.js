import Lo from 'lodash';

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
      org_web_address: data.Addresses,
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
        if (!payload.org_shared_users.includes(user.UserId.toString())) {
          payload.org_shared_users.push(user.UserId.toString());
        }
      });
    }
    return payload;
  }
  return {};
};

export const editOrganisationMapper = data => {
  if (!Lo.isEmpty(data)) {
    const payload = {
      // org_web_address: data.Addresses[0],
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
