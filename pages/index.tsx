import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';

const Home: NextPage = () => {
  const reactCanvas = useRef(null);
  useEffect(() => {
    (async () => {
      // engineを作るためにはcanvasが必要
      const renderCanvas = document.getElementById(
        'renderCanvas',
      ) as HTMLCanvasElement | null;

      // sceneを使用するためにはenginが必要
      // 第二引数でアンチエイリアス（モデルのエッジのギザギザを目立たなくするか）
      const engine = new BABYLON.Engine(renderCanvas, true);
      const scene = new BABYLON.Scene(engine);

      // カメラとライトの設定
      scene.createDefaultCameraOrLight(true, true, true);
      // 環境？の設定
      scene.createDefaultEnvironment();

      // モデル（今回はキューブの設定）
      const boxSize = 0.3;
      const box = BABYLON.MeshBuilder.CreateBox('box', { size: boxSize });

      box.position.addInPlaceFromFloats(0, boxSize / 2.0, 0);

      engine.runRenderLoop(() => {
        scene.render();
      });
    })();
  }, []);

  return (
    <div>
      <h1>
        Welcome to <a href='https://nextjs.org'>Next.js!</a>
      </h1>
      <canvas
        id='renderCanvas'
        style={{ width: 1440, height: 800 }}
        ref={reactCanvas}
      />
    </div>
  );
};

export default Home;
