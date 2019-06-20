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
  if (form.org_web_address) payload.Addresses = form.org_web_address;
  if (form.org_shared_users && form.org_shared_users.length > 0)
    payload.Users = form.org_shared_users;
  return payload;
};
