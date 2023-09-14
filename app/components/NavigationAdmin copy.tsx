import { Box, Tab, TabList, Tabs, Text, Flex } from '@chakra-ui/react';

export default function NavigationAdmin() {
  return (
    <>
      <Box background={'blue'} style={{ margin: 'auto', width: '100%' }}>
        <Box background={'white'} position={'fixed'} top={'70'}>
          <Tabs>
            <Box my={4} mx={5}>
              <Text fontWeight={'bold'} fontSize={'20px'}>
                Daftar Penarikan Dana
              </Text>
            </Box>

            <Box>
              <Box
                display={'flex'}
                overflow={'scroll'}
                sx={{
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                <TabList mx={5}>
                  <Tab>Semua</Tab>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab>
                        {/* NOTIFICATION ORDER */}
                        <Text
                          my={4}
                          color={'white'}
                          bg={'cyan.400'}
                          borderRadius={'full'}
                          boxSize={'24px'}
                          fontSize={14}
                          marginRight={2}
                        >
                          2 {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}
                        <Flex gap={1.5}>
                          <Text>Request</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab>
                        {/* NOTIFICATION ORDER */}
                        <Text
                          my={4}
                          color={'white'}
                          bg={'cyan.400'}
                          borderRadius={'full'}
                          boxSize={'24px'}
                          fontSize={14}
                          marginRight={2}
                        >
                          2 {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}

                        <Flex gap={1.5}>
                          <Text>Processing</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab>
                        {/* NOTIFICATION ORDER  !*/}
                        <Text
                          my={4}
                          color={'white'}
                          bg={'cyan.400'}
                          borderRadius={'full'}
                          boxSize={'24px'}
                          fontSize={14}
                          marginRight={2}
                        >
                          2 {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}

                        <Flex gap={1.5}>
                          <Text>Success</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>
                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab>
                        {/* NOTIFICATION ORDER */}
                        <Text
                          my={4}
                          color={'white'}
                          bg={'cyan.400'}
                          borderRadius={'full'}
                          boxSize={'24px'}
                          fontSize={14}
                          marginRight={2}
                        >
                          2 {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}
                        <Flex gap={1.5}>
                          <Text>Declined</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>
                </TabList>
              </Box>
              {/* </Tabs> */}
            </Box>
          </Tabs>
        </Box>
      </Box>
    </>
  );
}
