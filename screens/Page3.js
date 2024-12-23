import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Dr. Bioengineer</Text>
        <Text style={styles.subtitle}>Hayatın Ta Kendisi: Biyoteknoloji</Text>
      </View>

      {/* İlk kategori */}
      <Text style={styles.categoryTitle}>Kategori 1</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
        {['İçerik 1', 'İçerik 2', 'İçerik 3', 'İçerik 4', 'İçerik 5', 'İçerik 6'].map((item, index) => (
          <View key={index} style={[styles.box, index === 0 ? styles.firstBox : index === 5 ? styles.lastBox : styles.middleBox]}>
            <Text style={styles.boxText}>{item}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>oku</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* İkinci kategori */}
      <Text style={styles.categoryTitle}>Kategori 2</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
        {['İçerik 7', 'İçerik 8', 'İçerik 9', 'İçerik 10', 'İçerik 11', 'İçerik 12'].map((item, index) => (
          <View key={index} style={[styles.box, index === 0 ? styles.firstBox : index === 5 ? styles.lastBox : styles.middleBox]}>
            <Text style={styles.boxText}>{item}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>oku</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Üçüncü kategori */}
      <Text style={styles.categoryTitle}>Kategori 3</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
        {['İçerik 13', 'İçerik 14', 'İçerik 15', 'İçerik 16', 'İçerik 17', 'İçerik 18'].map((item, index) => (
          <View key={index} style={[styles.box, index === 0 ? styles.firstBox : index === 5 ? styles.lastBox : styles.middleBox]}>
            <Text style={styles.boxText}>{item}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>oku</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F4F4F4', // Arka plan rengi daha açık yapıldı
  },
  headerContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 50,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    color: '#555',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#333',
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  scrollRow: {
    width: '100%',
    marginTop: 20,
  },
  box: {
    width: 120,
    height: 160,
    borderRadius: 12, // Kutular daha zarif hale getirildi
    borderWidth: 1,
    borderColor: '#D0D0D0', // Daha hafif bir kenar rengi
    backgroundColor: 'transparent', // Kutular beyaz yapıldı
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 10,
    shadowColor: '#000', // Gölgelendirme eklendi
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  firstBox: {
    marginLeft: 15,
  },
  middleBox: {
    marginLeft: 15,
  },
  lastBox: {
    marginRight: 15,
  },
  boxText: {
    fontSize: 14,
    color: '#333', // Daha koyu metin rengi
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#2D2D2D', // "Oku" butonunun rengi siyahın tonu
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default HomeScreen;
