import axios, { AxiosError } from 'axios';

import { Base } from '../BaseAPIInterface';

interface RequestInterface {
  endpoint: string;
  id?: number;
  object?: Base;
  token: string;
}

export const getAll = async ({ endpoint }: RequestInterface) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/${endpoint}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error.message, error.request, error.response);
  }
};

export const getAllActive = async ({ endpoint, token }: RequestInterface) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/${endpoint}/listar`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error.message, error.request, error.response);
  }
};

export const softDelete = async ({ id, endpoint, token }: RequestInterface) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_SERVER_URL}/${endpoint}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error.message, error.request, error.response);
  }
};

export const hardDelete = async ({ id, endpoint, token }: RequestInterface) => {
  return await axios.delete(`${import.meta.env.VITE_API_SERVER_URL}/${endpoint}/hard_delete/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const getOne = async ({ id, endpoint, token }: RequestInterface) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/${endpoint}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const update = async ({ endpoint, object, id, token }: RequestInterface) => {
  try {
    if (object === undefined) {
      throw new Error('object is undefined');
    } else {
      const res = await axios.put(
        `${import.meta.env.VITE_API_SERVER_URL}/${endpoint}/${id}`,
        {
          ...object,
          id: id,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      return res;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const save = async ({ endpoint, object, token }: RequestInterface) => {
  try {
    if (object === undefined) {
      throw new Error('object is undefined');
    } else {
      const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/${endpoint}`, object, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return response;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
