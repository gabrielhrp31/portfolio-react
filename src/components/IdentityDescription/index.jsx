"use client";

import React from "react";
import OptimizedImage from "@/components/OptimizedImage";
import { mediaAlt, mediaUrl } from "@/lib/media";

function IdentityDescription({ media = null }) {
  return (
    <>
      <p className="text-and-image">
        <OptimizedImage
          src={mediaUrl(media, "id1")}
          alt={mediaAlt(media, "id1")}
          width={64}
          height={64}
          sizes="64px"
        />
        Em grande parte das linguagens as chaves “{"{}"}” determinam o início e
        o fim de uma determinada função.
      </p>
      <p className="text-and-image">
        <OptimizedImage
          src={mediaUrl(media, "id3")}
          alt={mediaAlt(media, "id3")}
          width={64}
          height={64}
          sizes="64px"
        />
        Alusão ao conjunto “ =&gt; ” usado para declarar uma “arrow function” na
        linguagem javascript na qual utilizo bastante em projetos que trabalho
        grande parte do tempo.
      </p>
      <p className="text-and-image">
        <OptimizedImage
          src={mediaUrl(media, "id2")}
          alt={mediaAlt(media, "id2")}
          width={64}
          height={64}
          sizes="64px"
        />
        A junção dos dois símbolos formam a letra “G” remetendo ao nome
        “Gabriel”.
      </p>
    </>
  );
}

export default IdentityDescription;
