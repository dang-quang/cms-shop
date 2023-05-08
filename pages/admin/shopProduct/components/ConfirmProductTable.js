import React from 'react';
import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Box,
  Image,
} from '@chakra-ui/react';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

const ConfirmProductTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = React.useMemo(() => columnsData, [columnsData]);
  const data = React.useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, initialState } =
    tableInstance;
  initialState.pageSize = 11;

  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  return (
    <Box
      flexDirection="column"
      w="100%"
      flex="2"
      px="0px"
      borderBottomWidth="1px"
      borderColor="gray.1600"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Table {...getTableProps()} variant="simple" color="gray.500">
        <Thead>
          {headerGroups.length > 0 &&
            headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe="10px"
                    key={index}
                    borderColor="gray.1600"
                    pl="32px"
                    pr="20px">
                    <Flex align="center" fontSize={{ sm: '10px', lg: '12px' }} color="text-gray-6">
                      <Text textStyle="h3-t" textTransform="capitalize" color="primary.200">
                        {column.render('Header')}
                      </Text>
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
        </Thead>
        <Tbody {...getTableBodyProps()} gap="20px">
          {page.length > 0 &&
            page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index} h="20px">
                  {row.cells.map((cell, index) => {
                    let data;
                    if (cell.column.Header === t('name')) {
                      data = (
                        <Flex>
                          <Image
                            borderRadius="0px"
                            objectFit="cover"
                            src={cell.value.image}
                            w="85px"
                            h="62px"
                            mr="3"
                          />
                          <Box>
                            <Text color="text-basic" textStyle="h3">
                              {cell.value.name}
                            </Text>
                            <Text textStyle="h2" color="text-body" mt="1">
                              {cell.value.code}
                            </Text>
                          </Box>
                        </Flex>
                      );
                    } else if (cell.column.Header === t('industry')) {
                      data = (
                        <Text color="text-basic" textStyle="h3">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === t('unit')) {
                      data = (
                        <Text color="text-basic" textStyle="h3">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === t('price')) {
                      data = (
                        <Text color="text-basic" textStyle="h3">
                          {cell.value}đ
                        </Text>
                      );
                    } else if (cell.column.Header === t('origin')) {
                      data = (
                        <Text color="text-basic" textStyle="h3">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === t('brand')) {
                      data = (
                        <Text color="text-basic" textStyle="h3">
                          {cell.value.name}
                        </Text>
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: '14px' }}
                        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                        borderColor="transparent">
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ConfirmProductTable;
