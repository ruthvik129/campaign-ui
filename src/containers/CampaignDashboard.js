import React, { useState } from 'react'
import Fuse from 'fuse.js'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import Card from '../components/card'
import NoDataFound from '../components/NoDataFound'
import styled from 'styled-components'
import { Button, useDisclosure, Collapse, FormControl, FormLabel, Input, HStack, FormHelperText, Badge } from "@chakra-ui/react"
import { MdDashboard, MdSettings, MdEqualizer } from "react-icons/md";
import { CampaignItems } from '../constants/data'

const Container = styled.div`
display:grid;
grid-template-columns:auto 1fr;
`
const CampaingsWrapper = styled.div`
display: grid;
padding:1rem;
grid-auto-rows: min-content;
`

const FieldSet = styled.fieldset`
border: 1px solid #ededed;
padding: 1rem;
margin: 1rem 0;
`

const listItems = [{
    name: 'Dashboard',
    icon: MdDashboard,
    id: 1
},
{
    name: 'Campaigns',
    icon: MdEqualizer,
    id: 2
},
{
    name: 'Settings',
    icon: MdSettings,
    id: 3
},
]

const CampaignDashboard = () => {
    const availableCampaignStatus = ['New' , 'Paused' , 'Stopped']
    let DisplayComponent
    const [campaignName, setCampaignName] = useState('');
    const [username, setUsername] = useState('');
    const[isClickedCampagin , setIsclicked] = useState('');
    const [CardList, setCardList] = useState(CampaignItems && CampaignItems)
    const [loading, setIsloading] = useState(false);
    const [selectedId, setSelectedId] = useState(2);
    const { isOpen, onToggle } = useDisclosure()
    switch (selectedId) {
        case 1:
            DisplayComponent = <NoDataFound />
            break;
        case 2:
            DisplayComponent = !CardList.length ? <NoDataFound /> : <Card onBadgeClick={(status , id)=>changeStatus(status , id)} availableCampaignStatus={availableCampaignStatus} isBadgeClicked={isClickedCampagin}  onStatusChange={(clickedCampaign)=>setIsclicked(clickedCampaign)} CampaignItems={CardList} />
            break;
        case 3:
            DisplayComponent = <NoDataFound />
            break;
        default:
            DisplayComponent = <NoDataFound />
            break;
    }

    const changeStatus = (status , id) => {
        const updatedStatus = CardList.map(obj =>
            obj.id === id ? { ...obj, campaign_status: status } : obj
        );
        setCardList(updatedStatus)
        setIsclicked(false)
    }   

    const onCampaignCreate = event => {
        event.preventDefault();
        setIsloading(true)
        let NewCampaign = {
            created_date: new Date().toDateString(),
            title: campaignName,
            campaign_status: 'new',
            campaign_type: ['SMS Marketing', 'Email Marketing'],
            username: username,
        }
        CardList.push(NewCampaign)
        setCardList(CardList)
        setTimeout(() => setIsloading(false), 3000)
        setCampaignName('')
        setUsername('')

    }

    const searchCampaign = (searchterm) => {
        if (!searchterm) {
            setCardList(CampaignItems);
            return;
        }
        const fuse = new Fuse(CardList, {
            keys: ['title','campaign_status' , 'campaign_type']
        });

        const result = fuse.search(searchterm)
        const matches = [];
        if (!result.length) {
            setCardList([]);
        } else {
            result.forEach(({ item }) => {
                matches.push(item);
            });
            setCardList(matches);
        }
    }



    return (
        <>
            <Container>
                <Sidebar onClickItem={(selectedid) => { setSelectedId(selectedid) }} listItems={listItems} />
                <CampaingsWrapper>
                    {selectedId === 2 && <SearchBar placeholder={"Search by campaign name , type and status"} onChange={event => searchCampaign(event.currentTarget.value)} showLeftElement showRightElement rightElementChild={<Button onClick={onToggle} colorScheme="blue" size="md">Create</Button>} />}
                    <Collapse in={isOpen} animateOpacity>
                        <form onSubmit={onCampaignCreate}>
                            <FieldSet>
                                <legend>Create Campaign:</legend>
                                <HStack spacing="24px">
                                    <FormControl id="campaign-name" isRequired>
                                        <FormLabel>Campaign name</FormLabel>
                                        <Input placeholder="Campaign name" value={campaignName} onChange={event => setCampaignName(event.currentTarget.value)} />

                                    </FormControl>
                                    <FormControl id="Username" isRequired>
                                        <FormLabel>Username</FormLabel>
                                        <Input placeholder="Username" value={username} onChange={event => setUsername(event.currentTarget.value)} />
                                    </FormControl>
                                </HStack>
                                <FormControl>
                                    <FormHelperText>The Status of the campaign would be new by default , you can later edit by clicking on <Badge borderRadius="full" px="2" colorScheme="teal">New</Badge></FormHelperText>
                                </FormControl>
                                <Button
                                    mt={4}
                                    isLoading={loading}
                                    colorScheme="blue"
                                    type="submit">
                                    Submit
                            </Button>
                            </FieldSet>
                        </form>
                    </Collapse>
                    {DisplayComponent}
                </CampaingsWrapper>
            </Container>

        </>
    )
}

export default CampaignDashboard
