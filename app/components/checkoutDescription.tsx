import { Box, Center, Img, Text, Heading } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
export default function CheckoutDescription(props: any) {
  return (
    <>
      <Box>
        <Center>
          <Box w={'1080px'} h={'1000px'} bg={'gray.200'}>
            <Img objectFit={'cover'} w={'100%'} src={props.image}></Img>
            <Box>
              <Text textAlign={'center'} mt={3}>
                <Heading color={'cyan.800'}>
                  <Link
                    to={'#description'}
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    Swipe Up !
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
                <Heading id="description">{props.name}</Heading>
              </Text>
              <Center>
                <Box w={'80%'} pb={'100px'}>
                  <Text fontSize={'26px'} textAlign={'justify'} mt={5}>
                    {props.description}
                  </Text>
                  {/* <Text fontSize={"26px"} textAlign={"justify"} mt={5}>
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
                  </Text> */}
                </Box>
              </Center>
            </Box>
          </Box>
        </Center>
      </Box>
    </>
  );
}
