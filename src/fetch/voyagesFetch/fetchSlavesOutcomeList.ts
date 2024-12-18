import axios from 'axios';
import { AUTHTOKEN, BASEURL } from '../../share/AUTH_BASEURL';

export const fetchSlavesOutcomeList = async () => {
  try {
    const response = await axios.get(`${BASEURL}/voyage/SlavesOutcomeList/`, {
      headers: { Authorization: AUTHTOKEN },
    });
    return response;
  } catch (error) {
    throw new Error('Failed to fetchSlavesOutcomeList data');
  }
};
