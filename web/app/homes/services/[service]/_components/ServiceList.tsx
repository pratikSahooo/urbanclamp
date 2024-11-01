"use client";

import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/data/services";
import { getServicesByCategory } from "@/lib/utils";
import ServiceDescDialog from "./ServiceDescDialog";
import { ExternalLinkIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/features/cart/CartSlice";

const ServiceList = (props: { foundCategorySlug: string }) => {
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col space-y-2">
            {getServicesByCategory(services, props.foundCategorySlug).map(
                (service, index) => (
                    <Card key={index}>
                        <CardContent className="mt-4 -mb-2">
                            <div className="flex space-x-2">
                                <div className="flex flex-col space-y-2 w-5/6">
                                    <div className="text-lg font-bold flex space-x-2 items-center group hover:text-violet-500 hover:cursor-pointer">
                                        <ServiceDescDialog
                                            title={service.title}
                                            description={service.description}
                                            duration={service.partnerName}
                                            price={service.price}
                                            starRating={service.starRating}
                                            numberOfReviews={
                                                service.reviewCount
                                            }
                                            slug={service.slug}
                                        />
                                        <ExternalLinkIcon className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition duration-300 ease-in-out" />
                                    </div>
                                    <div className="flex space-x-2 items-center">
                                        <StarIcon className="h-4 w-4" />
                                        <div>
                                            <Link
                                                href="#"
                                                className="underline underline-offset-4 decoration-dotted"
                                            >
                                                <span className="text-xs">
                                                    {service.starRating} (
                                                    {service.reviewCount}{" "}
                                                    Reviews)
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {service.description}
                                    </div>
                                    <div className="flex space-x-2 text-sm">
                                        <span>₹{service.price}</span>
                                        <span>&#x2022;</span>
                                        <span>{service.duration}</span>
                                    </div>
                                </div>
                                <div className="w-1/6 flex flex-col justify-center items-center">
                                    <Image
                                        src={`/images/icons/services/${props.foundCategorySlug}.png`}
                                        alt={props.foundCategorySlug}
                                        height={100}
                                        width={100}
                                        className="rounded-lg"
                                    />
                                    <Button
                                        variant="outline"
                                        className="-my-5"
                                        onClick={() => {
                                            dispatch(
                                                addToCart({
                                                    item: {
                                                        serviceSlug:
                                                            props.foundCategorySlug,
                                                        title: service.title,
                                                        price: service.price,
                                                        duration:
                                                            service.duration,
                                                        partnerName:
                                                            service.partnerName,
                                                    },
                                                })
                                            );
                                        }}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            )}
        </div>
    );
};

export default ServiceList;
