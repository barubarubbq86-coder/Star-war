// Phase 2 character catalog: stable IDs, reserved slots, stats and three visual states.
// Only listed provisional fields are design defaults; no changes to existing unit definitions.
window.SIEGE_CHARACTERS=[
  {
    "id": "ally_neko",
    "name": "ネコ",
    "side": "ally",
    "slot": 35,
    "type": "M",
    "stats": {
      "hp": 110,
      "atk": 26,
      "interval": 1,
      "range": 45,
      "speed": 105,
      "knockbacks": 5,
      "size": 64,
      "cost": 110,
      "cooldown": 3,
      "rarity": 0,
      "area": false
    },
    "provisional": [
      "hp",
      "atk",
      "interval",
      "range",
      "speed",
      "knockbacks",
      "size",
      "cost",
      "cooldown",
      "area"
    ],
    "description": "基本近接ユニット。能力は既存バランス型に準じた仮設定。",
    "attribute": "無属性",
    "frames": {
      "idle": {
        "path": "characters/ally_neko/idle.png",
        "box": [
          60,
          92,
          253,
          246
        ]
      },
      "attack": {
        "path": "characters/ally_neko/attack.png",
        "box": [
          34,
          79,
          342,
          250
        ]
      },
      "knockback": {
        "path": "characters/ally_neko/knockback.png",
        "box": [
          45,
          67,
          314,
          271
        ]
      }
    }
  },
  {
    "id": "ally_naganeko",
    "name": "ながネコ",
    "side": "ally",
    "slot": 36,
    "type": "M",
    "stats": {
      "hp": 380,
      "atk": 11,
      "interval": 1.25,
      "range": 35,
      "speed": 68,
      "knockbacks": 5,
      "size": 84,
      "cost": 100,
      "cooldown": 3,
      "rarity": 0,
      "area": false
    },
    "provisional": [
      "hp",
      "atk",
      "interval",
      "range",
      "speed",
      "knockbacks",
      "size",
      "cost",
      "cooldown",
      "area"
    ],
    "description": "壁・高耐久。能力は既存の壁型に準じた仮設定。",
    "attribute": "無属性",
    "frames": {
      "idle": {
        "path": "characters/ally_naganeko/idle.png",
        "box": [
          119,
          41,
          147,
          327
        ]
      },
      "attack": {
        "path": "characters/ally_naganeko/attack.png",
        "box": [
          56,
          44,
          291,
          318
        ]
      },
      "knockback": {
        "path": "characters/ally_naganeko/knockback.png",
        "box": [
          88,
          33,
          228,
          336
        ]
      }
    }
  },
  {
    "id": "enemy_womosan",
    "name": "ヲモさん",
    "side": "enemy",
    "slot": 40,
    "type": "M",
    "stats": {
      "hp": 600000,
      "atk": 30000,
      "interval": 7.5,
      "range": 110,
      "speed": 1.5,
      "knockbacks": 8,
      "size": 90,
      "area": false
    },
    "provisional": [
      "size",
      "area"
    ],
    "description": "謎の重い袋を背負って散歩する。特殊能力3種は保留・未発動。攻撃画像の老人の姿はユーザー承認済み。",
    "attribute": "無属性",
    "frames": {
      "idle": {
        "path": "characters/enemy_womosan/idle.png",
        "box": [
          69,
          25,
          245,
          338
        ]
      },
      "attack": {
        "path": "characters/enemy_womosan/attack.png",
        "box": [
          36,
          78,
          330,
          247
        ]
      },
      "knockback": {
        "path": "characters/enemy_womosan/knockback.png",
        "box": [
          16,
          35,
          360,
          320
        ]
      }
    }
  },
  {
    "id": "enemy_rourusan",
    "name": "老琉さん",
    "side": "enemy",
    "slot": 41,
    "type": "M",
    "stats": {
      "hp": 1000,
      "atk": 350,
      "interval": 4.666666666666666,
      "range": 110,
      "speed": 5,
      "knockbacks": 5,
      "size": 86,
      "area": false
    },
    "provisional": [
      "size",
      "area"
    ],
    "description": "犬のポチ（5歳）と一体のユニット。攻撃間隔はユーザー指示で約46.67秒の1/10。実効DPSは75。",
    "attribute": "無属性",
    "frames": {
      "idle": {
        "path": "characters/enemy_rourusan/idle.png",
        "box": [
          59,
          75,
          290,
          250
        ]
      },
      "attack": {
        "path": "characters/enemy_rourusan/attack.png",
        "box": [
          21,
          87,
          355,
          213
        ]
      },
      "knockback": {
        "path": "characters/enemy_rourusan/knockback.png",
        "box": [
          25,
          73,
          349,
          232
        ]
      }
    }
  },
  {
    "id": "enemy_take",
    "name": "竹",
    "side": "enemy",
    "slot": 42,
    "type": "M",
    "stats": {
      "hp": 220,
      "atk": 32,
      "interval": 1.3,
      "range": 60,
      "speed": 83,
      "knockbacks": 5,
      "size": 82,
      "area": false
    },
    "provisional": [
      "hp",
      "atk",
      "interval",
      "range",
      "speed",
      "knockbacks",
      "size",
      "area"
    ],
    "description": "紫のオーラをまとう緑の竹の精霊。能力は既存の自作敵初期値に準じた仮設定。",
    "attribute": "無属性",
    "frames": {
      "idle": {
        "path": "characters/enemy_take/idle.png",
        "box": [
          109,
          47,
          178,
          294
        ]
      },
      "attack": {
        "path": "characters/enemy_take/attack.png",
        "box": [
          23,
          49,
          341,
          287
        ]
      },
      "knockback": {
        "path": "characters/enemy_take/knockback.png",
        "box": [
          66,
          26,
          265,
          315
        ]
      }
    }
  },
  {
    "id": "enemy_kangaryu",
    "name": "カ・ンガリュ",
    "side": "enemy",
    "slot": 43,
    "type": "M",
    "stats": {
      "hp": 4000,
      "atk": 250,
      "interval": 1.05,
      "range": 55,
      "speed": 100,
      "knockbacks": 1,
      "size": 80,
      "area": false
    },
    "provisional": [
      "interval",
      "range",
      "speed",
      "size",
      "area"
    ],
    "description": "跳ねるカンガルー。未指定の間隔・射程・速度は既存モブに近い仮設定。",
    "attribute": "無属性",
    "frames": {
      "idle": {
        "path": "characters/enemy_kangaryu/idle.png",
        "box": [
          29,
          31,
          330,
          323
        ]
      },
      "attack": {
        "path": "characters/enemy_kangaryu/attack.png",
        "box": [
          18,
          31,
          358,
          316
        ]
      },
      "knockback": {
        "path": "characters/enemy_kangaryu/knockback.png",
        "box": [
          29,
          20,
          335,
          335
        ]
      }
    }
  },
  {
    "id": "enemy_gomasama",
    "name": "ゴマ様",
    "side": "enemy",
    "slot": 44,
    "type": "M",
    "stats": {
      "hp": 2500,
      "atk": 150,
      "interval": 1.3,
      "range": 45,
      "speed": 78,
      "knockbacks": 1,
      "size": 66,
      "area": false
    },
    "provisional": [
      "interval",
      "range",
      "speed",
      "size",
      "area"
    ],
    "description": "黒ごまの怪獣。未指定の間隔・射程・速度は既存モブに近い仮設定。",
    "attribute": "無属性",
    "frames": {
      "idle": {
        "path": "characters/enemy_gomasama/idle.png",
        "box": [
          101,
          131,
          182,
          181
        ]
      },
      "attack": {
        "path": "characters/enemy_gomasama/attack.png",
        "box": [
          29,
          81,
          336,
          225
        ]
      },
      "knockback": {
        "path": "characters/enemy_gomasama/knockback.png",
        "box": [
          92,
          78,
          206,
          221
        ]
      }
    }
  },
  {
    "id": "enemy_paon",
    "name": "パオン",
    "side": "enemy",
    "slot": 45,
    "type": "M",
    "stats": {
      "hp": 4000,
      "atk": 870,
      "interval": 2.5,
      "range": 100,
      "speed": 50,
      "knockbacks": 5,
      "size": 102,
      "area": false
    },
    "provisional": [
      "interval",
      "range",
      "speed",
      "knockbacks",
      "size",
      "area"
    ],
    "description": "ゾウの重量ユニット。未指定値は既存重量型を参考にした仮設定。",
    "attribute": "無属性",
    "frames": {
      "idle": {
        "path": "characters/enemy_paon/idle.png",
        "box": [
          46,
          89,
          297,
          231
        ]
      },
      "attack": {
        "path": "characters/enemy_paon/attack.png",
        "box": [
          13,
          69,
          368,
          250
        ]
      },
      "knockback": {
        "path": "characters/enemy_paon/knockback.png",
        "box": [
          31,
          54,
          331,
          282
        ]
      }
    }
  },
  {
    "id": "enemy_bunbunsensei",
    "name": "ぶんぶん先生",
    "side": "enemy",
    "slot": 46,
    "type": "B",
    "stats": {
      "hp": 99999,
      "atk": 3450,
      "interval": 1.38,
      "range": 100,
      "speed": 69,
      "knockbacks": 30,
      "size": 126,
      "area": false
    },
    "provisional": [
      "interval",
      "range",
      "speed",
      "size",
      "area"
    ],
    "description": "本と指示棒を持つ大型の先生バチ。自作ステージのボス候補。未指定値は既存ボスを参考にした仮設定。",
    "attribute": "無属性",
    "frames": {
      "idle": {
        "path": "characters/enemy_bunbunsensei/idle.png",
        "box": [
          23,
          66,
          355,
          270
        ]
      },
      "attack": {
        "path": "characters/enemy_bunbunsensei/attack.png",
        "box": [
          6,
          49,
          375,
          280
        ]
      },
      "knockback": {
        "path": "characters/enemy_bunbunsensei/knockback.png",
        "box": [
          21,
          45,
          358,
          276
        ]
      }
    }
  }
];
