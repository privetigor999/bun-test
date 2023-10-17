import React from 'react'
import Link from 'next/link';
import styled, { CSSProperties } from 'styled-components';

import type { IBreadcrumb } from './interface';

interface IBreadcrumbsProps {
  crubms: IBreadcrumb[];
  style: CSSProperties;
}

export const Breadcrumbs = ({crumbs, style}: IBreadcrumbsProps) => {
  const UlComponent = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
  `;

  const LiComponent = styled.ul`
    display: flex;
    align-items: center;
  `;

  const ParagraphComponent = styled.p`
    color: #c2c2c2
  `;

  return (
    <div>
      <nav>
        <UlComponent
          itemScope
          itemType='http://schema.org/BreadcrumbList'
        >
          {crumbs.length > 0 &&
            crumbs.map((crumb, i) => (
              <LiComponent
                itemProp='itemListElement'
                itemScope
                itemType='http://schema.org/ListItem'
                key={i}
                style={style}
              >
                {!!i && (
                  <>
                    &nbsp;<span>/</span>&nbsp;
                  </>
                )}

                {crumb.src ? (
                  <Link
                    itemProp='item'
                    itemScope
                    itemType='http://schema.org/Thing'
                    href={crumb.src}
                  >
                    {crumb.title + " "}
                  </Link>
                ) : (
                  <ParagraphComponent
                    itemProp="item"
                    itemScope
                    itemType='http://schema.org/Thing'
                  >
                    {crumb.title + " "}
                  </ParagraphComponent>
                )}
                <meta itemProp='position' content={i + 1} />
              </LiComponent>
            ))}
        </UlComponent>
      </nav>
    </div>
  );
}
