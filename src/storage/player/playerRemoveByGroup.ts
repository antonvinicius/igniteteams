import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from '@storage/player/playerGetByGroup'

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const playersInGroup = await playersGetByGroup(group)

    const playersFiltered = playersInGroup.filter(player => player.name !== playerName)

    const players = JSON.stringify(playersFiltered)

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players)
  } catch (error) {
    throw error
  }
}