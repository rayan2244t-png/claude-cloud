// Kokoro в Node.js для записи голосов заранее. Модель: KOKORO_MODEL_DIR (по умолчанию /tmp/kmodel),
// внутри — onnx-community/Kokoro-82M-v1.0-ONNX/{config.json, onnx/model.onnx}.
import { KokoroTTS } from 'kokoro-js';
import { StyleTextToSpeech2Model, Tensor, env } from '@huggingface/transformers';
import { makeTokenizer } from '../../src/game/kokoro-vocab.js';

export async function loadKokoro({ dir = process.env.KOKORO_MODEL_DIR || '/tmp/kmodel/', dtype = 'fp32' } = {}) {
  env.allowRemoteModels = false;
  env.localModelPath = dir;
  const model = await StyleTextToSpeech2Model.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype, device: 'cpu' });
  return new KokoroTTS(model, makeTokenizer(Tensor));
}
