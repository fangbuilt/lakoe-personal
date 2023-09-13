import { Box, Center, Img, Text, Heading } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
export default function CheckoutDescription() {
  return (
    <>
      <Box>
        <Center>
          <Box w={'1080px'} h={'2000px'} bg={'gray.200'}>
            <Img
              w={'1080px'}
              h={'1920px'}
              src={
                'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2515&q=80'
              }
            ></Img>
            <Box>
              <Text textAlign={'center'} mt={3}>
                <Heading color={'cyan.800'}>
                  {' '}
                  <Link
                    to={'#description'}
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {' '}
                    Swipe Up !{' '}
                  </Link>
                </Heading>
              </Text>
            </Box>
          </Box>
        </Center>

        <Center>
          <Box w={'1080px'} h={'100%'} mt={5} bg={'gray.200'}>
            <Box>
              <Text textAlign={'center'} mt={5}>
                <Heading fontFamily={'serif'}>Introducing,</Heading>
                <Heading id="description">Cave Natural Hair Powder</Heading>
              </Text>
              <Center>
                <Box w={'80%'} pb={'100px'}>
                  <Text fontSize={'26px'} textAlign={'justify'} mt={5}>
                    Cave Natural Hair Powder adalah Produk rambut Lorem ipsum,
                    dolor sit amet consectetur adipisicing elit. Voluptas autem
                    amet facere. Non blanditiis hic, id illum repellendus nam
                    cum autem sit. Reiciendis quisquam molestias nemo tempora
                    adipisci rerum, veritatis rem harum nostrum eligendi
                    delectus neque, odio ipsa, est dolorem aliquid praesentium
                    nulla laudantium. Quisquam perferendis repellat, magni qui
                    veritatis unde asperiores quae aperiam voluptate rem, totam
                    sequi atque in. Illo est velit quo, numquam blanditiis amet
                    id alias dignissimos nostrum, laborum vero sunt.
                    Accusantium, enim alias nobis, eum aliquid ex fugit illum ab
                    facilis nulla, necessitatibus aut veniam pariatur natus nisi
                    repudiandae dolores. Voluptatem magni iusto error repellat
                    eum! Illo est velit quo, numquam blanditiis amet id alias
                    dignissimos nostrum, laborum vero sunt. Accusantium, enim
                    alias nobis, eum aliquid ex fugit illum ab facilis nulla,
                    necessitatibus aut veniam pariatur natus nisi repudiandae
                    dolores. Voluptatem magni iusto error repellat eum!
                  </Text>
                </Box>
              </Center>
            </Box>
          </Box>
        </Center>
      </Box>
    </>
  );
}
