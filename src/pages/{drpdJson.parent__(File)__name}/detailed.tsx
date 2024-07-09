import * as React from "react";
import { graphql } from "gatsby";
import PokemonCard from "@/components/PokemonCard";
import TrainerCard from "@/components/TrainerCard";
import Layout from "@/components/Layout";
import { Pokemon, Wave } from "@/types";
import WaveInfoCard from "@/components/WaveInfoCard";

type DrpdData = {
  drpdJson: {
    authors: string[];
    date: string;
    starters: Pokemon[];
    title: string;
    version: string;
    waves: Wave[];
  };
};

const DetailedPage: React.FC<{ data: DrpdData; params: any }> = ({ data }) => {
  const { drpdJson } = data;

  const renderPokemonCards = (
    pokemon: Pokemon[],
    biome: string,
    waveIndex: number
  ) => (
    <div className="space-y-6">
      {pokemon.map((p, index) => (
        <PokemonCard
          key={index}
          pokemon={p}
          biome={biome}
          waveNumber={index === 0 ? waveIndex + 1 : undefined}
        />
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {drpdJson.waves.map((wave, waveIndex) => (
          <div key={waveIndex} className="mb-12">
            {wave.trainer ? (
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3 flex items-center">
                  <WaveInfoCard wave={wave} waveIndex={waveIndex} />
                </div>
                <div className="lg:w-2/3">
                  <TrainerCard
                    trainerId={wave.trainer.id}
                    trainerType={wave.trainer.type}
                    name={wave.trainer.name}
                    waveNumber={waveIndex + 1}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3 flex items-center">
                  <WaveInfoCard wave={wave} waveIndex={waveIndex} />
                </div>
                <div className="lg:w-2/3">
                  {renderPokemonCards(wave.pokemon, wave.biome, waveIndex)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query DrpdQuery($id: String) {
    drpdJson(id: { eq: $id }) {
      authors
      date
      starters {
        ability
        captured
        gender
        id
        isHiddenAbility
        items {
          id
          name
          quantity
        }
        ivs {
          atk
          def
          hp
          spatk
          spdef
          spe
        }
        name
        level
        nature
        passive
        rarity
      }
      title
      version
      waves {
        action
        biome
        double
        id
        pokemon {
          ability
          capture
          id
          gender
          captured
          isHiddenAbility
          items {
            id
            name
            quantity
          }
          ivs {
            atk
            def
            hp
            spatk
            spdef
            spe
          }
          name
          level
          nature
          passive
          rarity
        }
        reload
        trainer {
          id
          name
          type
        }
        type
      }
    }
  }
`;

export default DetailedPage;
