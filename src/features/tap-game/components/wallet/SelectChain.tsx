import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NextImage from "next/image";
import { useTranslation } from "@/app/[lng]/i18n/client";

interface ListChainProps {
  title: string;
  logo: string;
}

const SelectChain = () => {
  const { t } = useTranslation("tap-game", { keyPrefix: "wallet" });
  const listChain: ListChainProps[] = [
    {
      title: "bnb_chain",
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
    },
    {
      title: "eth_chain",
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    },
    {
      title: "base_chain",
      logo: "https://image.nftscan.com/eth/logo/0xd4307e0acd12cf46fd6cf93bc264f5d5d1598792.png",
    },
    {
      title: "arb_chain",
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png",
    },
  ];

  const [indexSelect, setIndexSelect] = useState("0");

  const selectedChain = listChain[Number(indexSelect)] as ListChainProps;

  return (
    <div>
      <Select
        onValueChange={(e) => {
          setIndexSelect(e);
        }}
        defaultValue={"bnb_chain"}
      >
        <SelectTrigger className="main-border-color shadow-noe main-text-primary main-bg-default border px-3 py-2 focus:main-bg-default focus:outline-none">
          <SelectValue className="shadow-none focus:outline-none">
            <div className="flex items-center">
              <NextImage
                src={selectedChain?.logo}
                alt={selectedChain?.title}
                width={16}
                height={16}
              />
              <span className="main-text-primary ml-2 text-base font-medium">
                {t(selectedChain?.title)}
              </span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="main-bg-secondary main-border-color border">
          {listChain.map((chain, idx) => (
            <SelectItem
              key={idx}
              className="hover:main-bg-default focus:main-bg-default"
              value={idx.toString()}
            >
              <div className="flex items-center">
                <NextImage
                  src={chain.logo}
                  alt={chain.title}
                  width={16}
                  height={16}
                />
                <span className="main-text-primary ml-2 text-sm font-medium">
                  {t(chain.title)}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectChain;
