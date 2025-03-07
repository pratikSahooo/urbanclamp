"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { categories } from "@/data/categories";
import { Service } from "@/data/services";
import { getCategoryBySlug } from "@/lib/utils";
import { addToCart } from "@/store/features/cart/CartSlice";
import { useAppDispatch } from "@/store/hooks";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ServiceDescDialog = (props: { service: any }) => {
    const dispatch = useAppDispatch();

    return (
        <Dialog>
            <DialogTrigger className="truncate">
                <span>{props.service.title}</span>
            </DialogTrigger>
            <DialogContent className="w-11/12 rounded-lg">
                <ScrollArea className="-mt-6 -mx-6">
                    <div className="flex space-x-1">
                        <Image
                            src={`/images/icons/services/${props.service.picture}.png`}
                            alt={props.service.picture}
                            height={200}
                            width={200}
                            className="rounded-lg text-center"
                        />
                        {/* <Image
                            src="https://picsum.photos/id/28/1080/720"
                            alt={props.service.slug}
                            height={300}
                            width={400}
                            className="rounded-lg"
                        />
                        <Image
                            src="https://picsum.photos/id/37/1080/720"
                            alt={props.service.slug}
                            height={300}
                            width={400}
                            className="rounded-lg"
                        /> */}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-col space-y-1">
                        <h1 className="text-xl font-bold">
                            {props.service.title}
                        </h1>
                        <div className="flex space-x-2 items-center">
                            <StarIcon className="h-4 w-4" />
                            <span className="text-xs underline underline-offset-4 decoration-dotted hover:cursor-pointer">
                                4.8 ( 1289 Reviews)
                            </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {props.service.description}
                        </div>
                        <div className="flex space-x-3 text-sm">
                            <span>₹ {props.service.price}</span>
                            <span>&#x2022;</span>
                            <span>{props.service.duration} minutes</span>
                            <span>&#x2022;</span>
                            <Link
                                href={`/partners/${props.service.partner.id}`}
                            >
                                <span className="hover:underline underline-offset-4">
                                    {props.service.partner.name}
                                </span>
                            </Link>
                        </div>
                    </div>
                    <DialogClose className="flex w-full">
                        <Button
                            onClick={() => {
                                dispatch(
                                    addToCart({
                                        item: {
                                            serviceCategory: "",
                                            serviceCategorySlug: "",
                                            serviceSlug: props.service.id,
                                            title: props.service.title,
                                            description:
                                                props.service.description,
                                            price: props.service.price,
                                            duration: props.service.duration,
                                            partnerName:
                                                props.service.partner.name,
                                            partnerSlug:
                                                props.service.partner.id,
                                        },
                                    })
                                );
                            }}
                            className="w-full"
                        >
                            Add
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ServiceDescDialog;
