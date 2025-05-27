import {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

/**
 * The handleSearch function trims the query, adds it to the search history if it's not already
 * included, limits the history to 5 items, shows the dropdown, and resets the query.
 */
const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery && !history.includes(trimmedQuery)) {
      setHistory([trimmedQuery, ...history.slice(0, 4)]); // limit to 5 items
    }
    setShowDropdown(true);
    setQuery('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search..."
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity onPress={handleSearch} style={styles.iconButton}>
          <Ionicons name="search" size={20} color="black" />
        </TouchableOpacity>
        {showDropdown && (
          <TouchableOpacity
            onPress={() => setShowDropdown(false)}
            style={styles.iconButton}>
            <Ionicons name="close" size={20} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {showDropdown && history.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={history}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Text style={styles.historyItem}>{item}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {padding: 20},
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 1,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: 'transparent',
  },
  iconButton: {
    padding: 5,
    marginLeft: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  historyItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    color: '#333',
  },
});
