import React from 'react';
import {
  AspectRatio,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  StylesProvider,
  Tbody,
  Td,
  Text,
  Tr,
  useStyles,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { BASE_API_URL } from 'utilities/const';
import { formatCurrency } from 'utilities/utils';
import { EVoucherStatus } from 'constants/types';
import { AiFillEdit } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';

const VoucherItem = ({ item, index, onUpdate, onDelete }) => {
  let _image = '';

  if (item && item.banner) {
    let firstChar = item.banner.substring(0, 4);

    if (firstChar === 'http' || firstChar === 'https') {
      _image = item.banner;
    } else {
      _image = BASE_API_URL + '/assets/' + item.banner;
    }
  }

  return <StylesProvider></StylesProvider>;
};

export default VoucherItem;
