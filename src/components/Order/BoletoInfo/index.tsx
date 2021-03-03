import Link from 'next/link';
import React from 'react';
import { FiCopy, FiDownload } from 'react-icons/fi';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import useClipboard from 'react-use-clipboard';
import { OrderData } from '../../../types/checkout';
import Button from '../../Form/Button';
import { BarcodeContainer, Container, Content } from './styles';

interface IProps {
  order: OrderData;
}

const OrderBoletoInfo = ({ order }: IProps) => {
  // const order: OrderData = props.order;
  const { boleto_barcode, boleto_url, boleto_expiration_date } = order.boleto;

  // const boleto_barcode =
  //   '03399.85301 29700.000242 27020.901016 2 78150000015630';
  // Boleto formmated without dots and spaces:
  const boleto_barcode_formatted = boleto_barcode
    ?.replace(/\./g, '')
    ?.replace(/\ /g, '');

  const boletoURL = `${boleto_url}`;
  const boletoPDF = `${boleto_url}?format=pdf`;
  const [isCopied, setCopied] = useClipboard(boleto_barcode_formatted, {
    // `isCopied` will go back to `false` after 1000ms.
    successDuration: 2000
  });

  const handleCopyToClipboard = () => {
    setCopied();
  };

  return (
    <Container>
      <BarcodeContainer>
        <p>Código de barras do Boleto:</p>
        <section>
          <a onClick={handleCopyToClipboard}>
            <p>{boleto_barcode}</p>
            <aside>
              {isCopied ? (
                <>
                  <IoMdCheckmarkCircleOutline size={18} />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <FiCopy size={18} />
                  <span>Copiar</span>
                </>
              )}
            </aside>
          </a>
        </section>
      </BarcodeContainer>
      <Content>
        <Link href={boletoURL}>
          <a target="_blank">
            <Button primary width="100%">
              <FiDownload size="18px" />
              <span>Ver o boleto</span>
            </Button>
          </a>
        </Link>
        <Link href={boletoPDF} passHref={true}>
          <a target="_blank">
            <Button primary width="100%">
              <FiDownload size="18px" />
              <span>Abrir o boleto em PDF</span>
            </Button>
          </a>
        </Link>
      </Content>
    </Container>
  );
};

export default OrderBoletoInfo;
