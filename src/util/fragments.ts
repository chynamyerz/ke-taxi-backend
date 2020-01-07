export const rideProperties = `
  id
  riders
  pickUp
  dropOff
  price
  status
`;

export const userProperties = `
  id
  email
  name
  cell
  rides {
    ${rideProperties}
  }
  roles
`;
