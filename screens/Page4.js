import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const BOARD_SIZE = 20;
const PLAYER_COUNT = 2;
const PAWNS_PER_PLAYER = 2; // Basitlik için her oyuncuya 2 piyon

export default function Page1() {
  // Oyun modunu tutan state: "SELECT" (seçim ekranı), "AI" veya "PLAYER"
  const [gameMode, setGameMode] = useState("SELECT");

  // Piyon konumlarını tutan state
  const [pawnPositions, setPawnPositions] = useState(
    Array.from({ length: PLAYER_COUNT }, () => Array(PAWNS_PER_PLAYER).fill(-1))
  );
  
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);

  // Zar atma fonksiyonu
  const rollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(result);
  };

  // Piyon hareketi - Basit kural: 6 atılırsa piyon tahtaya girer (-1 den 0'a), yoksa ilerler.
  const movePawn = (pawnIndex) => {
    if (diceRoll === null) return;

    setPawnPositions((prevPositions) => {
      const newPositions = prevPositions.map((arr) => [...arr]);
      const oldPos = newPositions[currentPlayer][pawnIndex];
      let newPos = oldPos;

      if (oldPos === -1 && diceRoll === 6) {
        newPos = 0;
      } else if (oldPos >= 0) {
        newPos = (oldPos + diceRoll) % BOARD_SIZE;
      }

      newPositions[currentPlayer][pawnIndex] = newPos;
      return newPositions;
    });

    endTurn();
  };

  // Tur bitince oyuncu değiştir
  const endTurn = () => {
    setDiceRoll(null);
    setCurrentPlayer((prev) => (prev + 1) % PLAYER_COUNT);
  };

  // Eğer AI modundaysak ve sıra AI'da ise otomatik hamle yaptır
  useEffect(() => {
    if (gameMode === "AI" && currentPlayer === 1) {
      // AI hamlesi:
      // 1. Zar at
      setTimeout(() => {
        rollDice();
      }, 1000);

      // 2. Zar atıldıktan bir süre sonra uygun piyonu hareket ettir
      // Basit AI: İlk oynanabilir piyonu hareket ettir
      setTimeout(() => {
        if (diceRoll !== null) {
          // Piyon seçimi: İlk -1 olanı 6 atarsa tahtaya sokar, yoksa ilk pozitif olanı ilerletir.
          setPawnPositions((prev) => {
            const aiPositions = prev[1];
            let pawnToMove = 0;
            // Önce tahtada olmayan ( -1 ) piyon var mı ve 6 atıldı mı?
            if (diceRoll === 6 && aiPositions.includes(-1)) {
              pawnToMove = aiPositions.indexOf(-1);
            } else {
              // Yoksa ilk bulunan piyon hareket ettir
              const firstInPlay = aiPositions.findIndex(p => p >= 0);
              if (firstInPlay !== -1) {
                pawnToMove = firstInPlay;
              }
            }
            movePawn(pawnToMove);
            return prev;
          });
        }
      }, 2000);
    }
  }, [gameMode, currentPlayer, diceRoll]);

  // Tahtayı çizen fonksiyon
  const renderBoard = () => {
    // BOARD_SIZE kadar kare oluştur.
    const cells = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      // Bu karede hangi piyon/piyonlar var?
      const pawnsHere = [];
      pawnPositions.forEach((playerPawns, pIndex) => {
        playerPawns.forEach((pos, pi) => {
          if (pos === i) {
            pawnsHere.push({ player: pIndex, pawn: pi });
          }
        });
      });

      cells.push(
        <View key={i} style={styles.cell}>
          <Text style={styles.cellText}>{i}</Text>
          {pawnsHere.map((p, idx) => (
            <View
              key={idx}
              style={[
                styles.pawnMarker,
                { backgroundColor: p.player === 0 ? 'red' : 'blue' }
              ]}
            >
              <Text style={styles.pawnMarkerText}>
                P{p.player+1}{p.pawn+1}
              </Text>
            </View>
          ))}
        </View>
      );
    }

    return <View style={styles.boardContainer}>{cells}</View>;
  };

  // Seçim ekranı
  if (gameMode === "SELECT") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mini Oyun</Text>
        <Text style={styles.subtitle}>Nasıl oynamak istersin?</Text>
        <TouchableOpacity style={styles.choiceButton} onPress={() => setGameMode("PLAYER")}>
          <Text style={styles.choiceButtonText}>Gerçek Oyuncuya Karşı</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choiceButton} onPress={() => setGameMode("AI")}>
          <Text style={styles.choiceButtonText}>Yapay Zekaya Karşı</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Oyun ekranı
  const isCurrentPlayerHuman = (gameMode === "AI" && currentPlayer === 1) ? false : true;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>YoakeNoHana Kızmabirader</Text>
      <Text style={styles.subtitle}>Oyun Modu: {gameMode === "AI" ? "Yapay Zeka" : "Oyuncu"}</Text>
      <Text style={styles.subtitle}>Sıra Oyuncu {currentPlayer+1}'da</Text>

      {renderBoard()}

      <View style={styles.infoContainer}>
        <Text>Zar Sonucu: {diceRoll !== null ? diceRoll : "-"}</Text>
        {isCurrentPlayerHuman && (
          <TouchableOpacity style={styles.diceButton} onPress={rollDice}>
            <Text style={styles.diceButtonText}>Zar At</Text>
          </TouchableOpacity>
        )}
      </View>

      {isCurrentPlayerHuman && (
        <View>
          <Text>Piyonlarını Seç:</Text>
          {pawnPositions[currentPlayer].map((pos, i) => (
            <TouchableOpacity
              key={i}
              style={styles.pawnSelectButton}
              onPress={() => movePawn(i)}
              disabled={diceRoll === null}  
            >
              <Text style={styles.pawnSelectButtonText}>Piyon {i+1}: {pos === -1 ? "Evde" : pos}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fafafa'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom:10
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  choiceButton: {
    backgroundColor: '#3498db',
    marginVertical: 10,
    padding: 15,
    borderRadius:5
  },
  choiceButtonText: {
    color: '#fff',
    fontSize:16,
    fontWeight:'bold'
  },
  boardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    marginVertical:20
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth:1,
    borderColor:'#ccc',
    justifyContent:'center',
    alignItems:'center',
    position:'relative'
  },
  cellText: {
    fontSize:14
  },
  pawnMarker: {
    position:'absolute',
    bottom:2,
    right:2,
    paddingHorizontal:3,
    paddingVertical:1,
    borderRadius:3,
  },
  pawnMarkerText: {
    fontSize:10,
    color:'#fff'
  },
  infoContainer: {
    alignItems:'center',
    marginVertical:10
  },
  diceButton: {
    backgroundColor:'#2ecc71',
    padding:10,
    borderRadius:5,
    marginTop:5
  },
  diceButtonText:{
    color:'#fff',
    fontWeight:'bold'
  },
  pawnSelectButton: {
    backgroundColor:'#dcdcdc',
    padding:5,
    marginVertical:5,
    borderRadius:5
  },
  pawnSelectButtonText:{
    fontSize:14
  }
});
