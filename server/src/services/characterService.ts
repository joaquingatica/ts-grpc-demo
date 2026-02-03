import { ServerError, Status } from 'nice-grpc'

import { charactersData } from '../data/characters'
import {
  CharacterServiceImplementation,
  CreateCharacterRequest,
  CreateCharacterResponse,
  DeepPartial,
  DeleteCharacterRequest,
  DeleteCharacterResponse,
  GetCharactersResponse,
  UpdateCharacterRequest,
  UpdateCharacterResponse,
} from '../proto/gatica/middleearth/v1/character_service'

export const characterService: CharacterServiceImplementation = {
  getCharacters: async (): Promise<DeepPartial<GetCharactersResponse>> => {
    return {
      characters: charactersData.get(),
    }
  },

  createCharacter: async ({
    name,
    people,
    alive,
  }: CreateCharacterRequest): Promise<DeepPartial<CreateCharacterResponse>> => {
    const character = charactersData.create({ name, people, alive })
    return {
      character,
    }
  },

  updateCharacter: async ({
    id,
    name,
    people,
    alive,
  }: UpdateCharacterRequest): Promise<DeepPartial<UpdateCharacterResponse>> => {
    const character = charactersData.update({ id, name, people, alive })
    if (!character) {
      throw new ServerError(Status.NOT_FOUND, `Character not found for id ${id}`)
    }
    return {
      character,
    }
  },

  deleteCharacter: async ({
    id,
  }: DeleteCharacterRequest): Promise<DeepPartial<DeleteCharacterResponse>> => {
    const character = charactersData.delete(id)
    if (!character) {
      throw new ServerError(Status.NOT_FOUND, `Character not found for id ${id}`)
    }
    return { id }
  },
}
