import ProfileCard from "../components/Profile/ProfileCards"
import { Orders } from "../components/Profile/Orders"
import { Flex } from "@mantine/core"

const Profile = () => {

  return (
    <>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={20} m={20}>
        <ProfileCard />
        <Orders />
      </Flex>
      
    </>
  )
}

export default Profile