import React from 'react'
import styled from 'styled-components'
import {
    Box,
    Avatar,
    Stack,
    Text,
    Badge
} from "@chakra-ui/react"


const CardContainer = styled.div`
display:flex;
flex-wrap:wrap;
gap:2rem;
margin:1rem 0;
height:min-content;
`

const Card = (props) => {
    const colorScheme = {
        new: "teal",
        paused: "orange",
        stopped: "red"
    }
    return (
        <CardContainer>
            {
                props.CampaignItems && props.CampaignItems.map((campaign) => (
                    <Box key={campaign?.id} minW="sm" maxW='sm' maxH='sm' borderWidth="1px" borderRadius="lg" overflow="hidden">
                        <Box p="4">
                            {props.isBadgeClicked &&

                                props.isBadgeClicked === campaign?.id ?
                                <Stack mb="2" direction="row">
                                    {props.availableCampaignStatus && props.availableCampaignStatus.map((status, id) => (
                                        <Badge cursor={'pointer'} key={id} onClick={() => props.onBadgeClick(status, campaign?.id)} borderRadius="full" px="2" colorScheme={colorScheme[status.toLowerCase()]}>
                                            {status}
                                        </Badge>
                                    ))}
                                </Stack>
                                :
                                <Badge cursor={'pointer'} onClick={() => props.onStatusChange(campaign?.id)} mb="2" borderRadius="full" px="2" colorScheme={colorScheme[campaign?.campaign_status.toLowerCase()]}>
                                    {campaign?.campaign_status}
                                </Badge>
                            }
                            <Box
                                color="gray.500"
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                textTransform="uppercase"
                            >
                                created &bull; {campaign?.created_date}  &bull; modified &bull; {campaign?.modified_date ?? 'NA'}
                            </Box>

                            <Box
                                mt="1"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                isTruncated
                            >
                                {campaign?.title}
                            </Box>
                            <Box d="flex">
                                <Avatar size="2xs" name="Ryan Florence" src="https://bit.ly/ryan-florence" />
                                <Text ml='3' color="#000" align="center" fontSize="sm">{campaign?.username}</Text>
                            </Box>
                            <Box m="3" as="hr" color="gray.600" fontSize="sm" />
                            <Box d="flex" flexWrap="wrap" gap="1rem">
                                {
                                    campaign?.campaign_type.map((type , id) => (
                                        <Badge key={id} mb="2" mr="2" borderRadius="full" px="2" colorScheme="cyan">
                                            {type}
                                        </Badge>
                                    ))
                                }
                            </Box>

                        </Box>
                    </Box>
                ))
            }

        </CardContainer>
    )
}

Card.defaultProps = {
    onStatusChange: () => { },
    onBadgeClick : () => {  },
    listItems : []
}

export default Card
