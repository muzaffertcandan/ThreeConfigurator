import { proxy } from "valtio";

const state = proxy({
  intro: true,
  decals: ['react', 'three2', 'pmndrs', 'exar'],
  selectedDecal: 'exar'
});

export { state };
