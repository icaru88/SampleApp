import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import _ from 'lodash';
import {SearchBar} from 'src/Components/SearchBar';
import {UserItem} from 'src/Components/UserItem';
import {useAppSelector} from 'src/hooks';
import {User} from 'src/Model/User';
import {useListUsersQuery} from 'src/Services/UsersApi';
import {
  getCurrentUsersListingPage,
  getTotalUsersListingPage,
  getUsersListing,
} from 'src/Store/UserSlice';
import {Theme} from 'src/Theme';

const NO_OF_ITEMS_PER_PAGE = 6;

export const HomeScreen: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  const currentLoadedPage = useAppSelector(state =>
    getCurrentUsersListingPage(state),
  );
  const totalListingPage = useAppSelector(state =>
    getTotalUsersListingPage(state),
  );
  const currentUsersListInState = useAppSelector(state =>
    getUsersListing(state),
  );

  const [data, setData] = useState<User[]>([]);

  const {isLoading, isFetching} = useListUsersQuery({
    page,
    per_page: NO_OF_ITEMS_PER_PAGE,
  });

  useEffect(() => {
    setData(currentUsersListInState);
  }, [currentUsersListInState]);

  const onSearchResult = () => {
    if (searchText.trim() === '') return setData(currentUsersListInState);
    if (searchText.trim().length < 3) {
      Alert.alert('Info', 'Please key in minimum 3 characters');
      return;
    }

    const newUsers: User[] = [];
    data.forEach(item => {
      const {first_name, last_name, email} = item;
      const name = `${first_name} ${last_name}`;

      if (name.indexOf(searchText) > -1) {
        newUsers.push(item);
      }

      if (email.indexOf(searchText) > -1) {
        newUsers.push(item);
      }
    });
    setData(newUsers);
  };

  const onClearText = () => {
    setSearchText('');
    setData(currentUsersListInState);
  };
  const renderItem: ListRenderItem<User> = ({item}) => {
    const {first_name, last_name} = item;
    const name = `${first_name} ${last_name}`;

    return <UserItem onPress={() => null} name={name} {...item} />;
  };

  const onLoadMore = useCallback(() => {
    if (searchText.trim().length > 0) return;

    if (currentLoadedPage < totalListingPage) {
      setPage(currentLoadedPage + 1);
    }
  }, [currentLoadedPage, searchText, totalListingPage]);

  const renderFooter = () => {
    return isFetching ? (
      <ActivityIndicator size="large" color={Theme.colors.pink} />
    ) : null;
  };
  return (
    <FlatList
      refreshing={isLoading}
      renderItem={renderItem}
      data={data}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.mainContainer}
      ListHeaderComponent={
        <SearchBar
          value={searchText}
          placeHolder={'Search...'}
          onChangeText={val => {
            setSearchText(val);
          }}
          onClearText={onClearText}
          onPressToSearch={onSearchResult}
        />
      }
      ListEmptyComponent={
        <View style={{flex: 1}}>
          <Text>No user found</Text>
        </View>
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      ListFooterComponentStyle={{
        paddingBottom: 50,
      }}
      initialNumToRender={NO_OF_ITEMS_PER_PAGE}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: Theme.backgroundColor,
    paddingHorizontal: 20,
  },
});
