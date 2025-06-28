import { useInputValidation } from '6pp';
import { Search as SearchIcon } from '@mui/icons-material';
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation } from '../../hooks/hook';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api';
import { setIsSearch } from '../../redux/reducers/misc';
import UserItem from '../shared/UserItem';
//                         Chat App


const Search = () => {

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);

  const dispatch = useDispatch();

  const search = useInputValidation("");
  const { isSearch, isFriend } = useSelector(state => state.misc);


  const [users, setUsers] = useState([]);
  const addHandler = async (id) => {
    await sendFriendRequest("Send Friend Request", { userId: id });
  };

  const searchClosehandler = () => {
    dispatch(setIsSearch(false));
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => {
          if (data?.users) setUsers(data.users);
        })
        .catch(err => {
          console.log(err);
        });
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [search.value]);



  return (

    <Dialog open={isSearch} onClose={searchClosehandler}>
      <Stack p={'2rem'} direction={"column"} width={{xs: "100%", sm: "25rem"}}  sx={{
      backgroundImage: 'linear-gradient(135deg, rgb(202, 100, 227,0.7),rgba(239, 195, 230, 0.4))', backdropFilter: 'blur(20px)'
    }}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant='outlined'
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          sx={{
            border: '1px solid rgb(36,0,70)',
            borderRadius: '5px',
          }}
        />
        <List>
          {users.map((i) => (
            <UserItem key={i._id} user={i} handler={addHandler} handlerIsLoading={isLoadingSendFriendRequest} />
          ))}
        </List>
      </Stack>
    </Dialog>
  )
}

export default Search