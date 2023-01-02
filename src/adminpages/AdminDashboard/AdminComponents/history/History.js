import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import React, {useEffect} from 'react'
import Completed from '../../Completed';
import Historylist from './Historylist';

const History = ({setSelectedLink, link}) => {

  useEffect(() => {
    setSelectedLink(link)
  }, []);
  
  return (
    <>
      <div classname="bgcolor">
        <Box sx={{flexGrow: 1, p: 3}}>
          <Historylist/>
          <Completed/>
        </Box>
      </div>
    </>
  )
}

export default History;

