import React, { useState } from "react";
import { Form, Input, Select, TreeSelect } from "antd";
import { Box, IconButton } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import TextArea from "antd/es/input/TextArea";
import "@/style/newVoyages.scss";
import CommentBox from "../CommentBox";

interface ShipData {
    name: string;
    constructionPlace: string;
    registrationPlace: string;
    constructionYear: string;
    registrationYear: string;
    nationalCarrier: string;
    rigOfVessel: string;
    tonOfVessel: string;
    tonDefinition: string;
    gunsMounted: string;
    firstOwner: string;
    secondOwner: string;
    otherOwners: string;
    cargo: Cargo[];
}

interface Cargo {
    type: string;
    unit: string;
    amount: string;
}

const VoyageItinerary: React.FC = () => {
    const [shipData, setShipData] = useState<ShipData>({
        name: "",
        constructionPlace: "",
        registrationPlace: "",
        constructionYear: "",
        registrationYear: "",
        nationalCarrier: "",
        rigOfVessel: "",
        tonOfVessel: "",
        tonDefinition: "",
        gunsMounted: "",
        firstOwner: "",
        secondOwner: "",
        otherOwners: "",
        cargo: [{ type: "", unit: "", amount: "" }],
    });

    const [visibleCommentField, setVisibleCommentField] = useState<string | null>(null);
    const [comments, setComments] = useState<{ [key: string]: string }>({});

    const treeData = [
        {
            title: "Africa",
            value: "Africa",
            children: [
                {
                    title: "Senegalambia and offshore Atlantic",
                    value: "Africa > Senegalambia and offshore Atlantic",
                    children: [
                        {
                            title: "Albreda",
                            value: "Africa > Senegalambia and offshore Atlantic > Albreda",
                        },
                    ],
                },
            ],
        },
    ];

    const handleInputChange = (field: keyof ShipData, value: string) => {
        setShipData({
            ...shipData,
            [field]: value,
        });
    };

    const handleTreeSelect = (
        field: "constructionPlace" | "registrationPlace",
        value: string
    ) => {
        setShipData({
            ...shipData,
            [field]: value,
        });
    };


    const toggleCommentBox = (field: string) => {
        setVisibleCommentField(visibleCommentField === field ? null : field);
    };

    const handleCommentChange = (field: string, value: string) => {
        setComments({
            ...comments,
            [field]: value,
        });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", margin: "auto" }}>
            <Form layout="vertical">
                <Form.Item label={<span className="form-contribute-label">Name of vessel:</span>} className="form-contribute">
                    <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
                        <Input
                            type="text"
                            value={shipData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            style={{ width: 'calc(100% - 20px)' }}
                        />
                        <IconButton
                            onClick={() => toggleCommentBox("name")}
                            sx={{
                                position: "absolute",
                                right: "-15px",
                                top: "50%",
                                transform: "translateY(-50%)",
                            }}
                            aria-label="add comment"
                        >
                            <CommentIcon />
                        </IconButton>
                    </Box>
                    <CommentBox
                        isVisible={visibleCommentField === "name"}
                        value={comments["vesselType"] || ""}
                        onChange={(value) => handleCommentChange("vesselType", value)}
                    />
                </Form.Item>

                <Form.Item label={<span className="form-contribute-label">Place where ship constructed:</span>} className="form-contribute">
                    <TreeSelect
                        placeholder="Select place where ship constructed"
                        value={shipData.constructionPlace}
                        onChange={(value) => handleTreeSelect("constructionPlace", value)}
                        treeData={treeData}
                        style={{ width: 'calc(100% - 20px)' }}
                        treeDefaultExpandAll
                    />
                    <IconButton
                        onClick={() => toggleCommentBox("constructionPlace")}
                        sx={{
                            position: "absolute",
                            right: "-15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                        aria-label="add comment"
                    >
                        <CommentIcon />
                    </IconButton>
                    <CommentBox
                        isVisible={visibleCommentField === "constructionPlace"}
                        value={comments["constructionPlace"] || ""}
                        onChange={(value) => handleCommentChange("constructionPlace", value)}
                    />
                </Form.Item>
                <Form.Item label={<span className="form-contribute-label">Place where ship registered:</span>} className="form-contribute">
                    <TreeSelect
                        placeholder="Select place where ship registered"
                        value={shipData.registrationPlace}
                        onChange={(value) => handleTreeSelect("registrationPlace", value)}
                        treeData={treeData}
                        style={{ width: 'calc(100% - 20px)' }}
                        treeDefaultExpandAll
                    />
                    <IconButton
                        onClick={() => toggleCommentBox("registrationPlace")}
                        sx={{
                            position: "absolute",
                            right: "-15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                        aria-label="add comment"
                    >
                        <CommentIcon />
                    </IconButton>
                    <CommentBox
                        isVisible={visibleCommentField === "registrationPlace"}
                        value={comments["registrationPlace"] || ""}
                        onChange={(value) => handleCommentChange("registrationPlace", value)}
                    />
                </Form.Item>
                <Form.Item label={<span className="form-contribute-label">Year of ship construction:</span>} className="form-contribute">
                    <Input
                        type="number"
                        value={shipData.constructionYear}
                        style={{ width: 'calc(100% - 20px)' }}
                        onChange={(e) => handleInputChange("constructionYear", e.target.value)}
                    />
                    <IconButton
                        onClick={() => toggleCommentBox("constructionYear")}
                        sx={{
                            position: "absolute",
                            right: "-15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                        aria-label="add comment"
                    >
                        <CommentIcon />
                    </IconButton>
                    <CommentBox
                        isVisible={visibleCommentField === "constructionYear"}
                        value={comments["constructionYear"] || ""}
                        onChange={(value) => handleCommentChange("constructionYear", value)}
                    />
                </Form.Item>
                <Form.Item label={<span className="form-contribute-label">Year of ship registration:</span>} className="form-contribute">
                    <Input
                        type="number"
                        value={shipData.registrationYear}
                        style={{ width: 'calc(100% - 20px)' }}
                        onChange={(e) => handleInputChange("registrationYear", e.target.value)}
                    />
                    <IconButton
                        onClick={() => toggleCommentBox("registrationYear")}
                        sx={{
                            position: "absolute",
                            right: "-15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                        aria-label="add comment"
                    >
                        <CommentIcon />
                    </IconButton>
                    <CommentBox
                        isVisible={visibleCommentField === "registrationYear"}
                        value={comments["registrationYear"] || ""}
                        onChange={(value) => handleCommentChange("registrationYear", value)}
                    />
                </Form.Item>
                <Form.Item label={<span className="form-contribute-label">National carrier:</span>} className="form-contribute">
                    <Select
                        placeholder="Select national carrier"
                        value={shipData.nationalCarrier}
                        style={{ width: 'calc(100% - 20px)' }}
                        onChange={(value) => setShipData({ ...shipData, nationalCarrier: value })}
                        options={[
                            { value: "Denmark", label: "Denmark" },
                            { value: "Argentina", label: "Argentina" },
                        ]}
                    />
                    <IconButton
                        onClick={() => toggleCommentBox("nationalCarrier")}
                        sx={{
                            position: "absolute",
                            right: "-15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                        aria-label="add comment"
                    >
                        <CommentIcon />
                    </IconButton>
                    <CommentBox
                        isVisible={visibleCommentField === "nationalCarrier"}
                        value={comments["nationalCarrier"] || ""}
                        onChange={(value) => handleCommentChange("nationalCarrier", value)}
                    />
                    <p className="form_help_text">
                        If not country of registration, use the comments box to explain coding.
                    </p>
                </Form.Item>
                <Form.Item label={<span className="form-contribute-label">Rig of vessel:</span>} className="form-contribute">
                    <Select
                        placeholder="Select rig of vessel"
                        value={shipData.rigOfVessel}
                        style={{ width: 'calc(100% - 20px)' }}
                        onChange={(value) => setShipData({ ...shipData, rigOfVessel: value })}
                        options={[
                            { value: "Balandra", label: "Balandra" },
                            { value: "Barca", label: "Barca" },
                        ]}
                    />
                    <IconButton
                        onClick={() => toggleCommentBox("rigOfVessel")}
                        sx={{
                            position: "absolute",
                            right: "-15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                        aria-label="add comment"
                    >
                        <CommentIcon />
                    </IconButton>
                    <CommentBox
                        isVisible={visibleCommentField === "rigOfVessel"}
                        value={comments["rigOfVessel"] || ""}
                        onChange={(value) => handleCommentChange("rigOfVessel", value)}
                    />
                </Form.Item>
                <Form.Item label={<span className="form-contribute-label">Tonnage of vessel:</span>} className="form-contribute">
                    <Input
                        type="number"
                        value={shipData.tonOfVessel}
                        style={{ width: 'calc(100% - 20px)' }}
                        onChange={(e) => handleInputChange("tonOfVessel", e.target.value)}
                    />
                    <IconButton
                        onClick={() => toggleCommentBox("tonOfVessel")}
                        sx={{
                            position: "absolute",
                            right: "-15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                        aria-label="add comment"
                    >
                        <CommentIcon />
                    </IconButton>
                    <CommentBox
                        isVisible={visibleCommentField === "tonOfVessel"}
                        value={comments["tonOfVessel"] || ""}
                        onChange={(value) => handleCommentChange("tonOfVessel", value)}
                    />
                </Form.Item>
                <Form.Item label={<span className="form-contribute-label">Definition of ton:</span>} className="form-contribute">
                    <Select
                        placeholder="Select definition of ton"
                        value={shipData.tonDefinition}
                        style={{ width: 'calc(100% - 20px)' }}
                        onChange={(value) => setShipData({ ...shipData, tonDefinition: value })}
                        options={[
                            { value: "Argentinian", label: "Argentinian" },
                            { value: "Brazilian", label: "Brazilian" },
                        ]}
                    />
                    <IconButton
                        onClick={() => toggleCommentBox("tonDefinition")}
                        sx={{
                            position: "absolute",
                            right: "-15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                        aria-label="add comment"
                    >
                        <CommentIcon />
                    </IconButton>
                    <CommentBox
                        isVisible={visibleCommentField === "tonDefinition"}
                        value={comments["tonDefinition"] || ""}
                        onChange={(value) => handleCommentChange("tonDefinition", value)}
                    />

                </Form.Item>
                <Form.Item label={<span className="form-contribute-label">Guns mounted:</span>} className="form-contribute">
                    <Input
                        type="number"
                        value={shipData.gunsMounted}
                        style={{ width: 'calc(100% - 20px)' }}
                        onChange={(e) => handleInputChange("gunsMounted", e.target.value)}
                    />
                    <IconButton
                        onClick={() => toggleCommentBox("gunsMounted")}
                        sx={{
                            position: "absolute",
                            right: "-15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                        aria-label="add comment"
                    >
                        <CommentIcon />
                    </IconButton>
                    <CommentBox
                        isVisible={visibleCommentField === "gunsMounted"}
                        value={comments["gunsMounted"] || ""}
                        onChange={(value) => handleCommentChange("gunsMounted", value)}
                    />
                </Form.Item>
                <Form.Item label={<span className="form-contribute-label">First or managing owner of venture:</span>} className="form-contribute">
                    <Input
                        type="text"
                        value={shipData.firstOwner}
                        style={{ width: 'calc(100% - 20px)' }}
                        onChange={(e) => handleInputChange("firstOwner", e.target.value)}
                    />
                    <IconButton
                        onClick={() => toggleCommentBox("firstOwner")}
                        sx={{
                            position: "absolute",
                            right: "-15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                        aria-label="add comment"
                    >
                        <CommentIcon />
                    </IconButton>
                    <CommentBox
                        isVisible={visibleCommentField === "firstOwner"}
                        value={comments["firstOwner"] || ""}
                        onChange={(value) => handleCommentChange("firstOwner", value)}
                    />
                    <p className="form_help_text">Enter last name , first name.</p>
                </Form.Item>
                <Form.Item label={<span className="form-contribute-label">Second owner of venture:</span>} className="form-contribute">
                    <Input
                        type="text"
                        value={shipData.secondOwner}
                        style={{ width: 'calc(100% - 20px)' }}
                        onChange={(e) => handleInputChange("secondOwner", e.target.value)}
                    />
                    <IconButton
                        onClick={() => toggleCommentBox("secondOwner")}
                        sx={{
                            position: "absolute",
                            right: "-15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                        aria-label="add comment"
                    >
                        <CommentIcon />
                    </IconButton>
                    <CommentBox
                        isVisible={visibleCommentField === "secondOwner"}
                        value={comments["secondOwner"] || ""}
                        onChange={(value) => handleCommentChange("secondOwner", value)}
                    />
                    <p className="form_help_text">Enter last name , first name.</p>
                </Form.Item>
                <Form.Item label={<span className="form-contribute-label">Other owners:</span>} className="form-contribute">
                    <TextArea
                        rows={2}
                        value={shipData.otherOwners}
                        style={{ width: 'calc(100% - 20px)' }}
                        onChange={(e) => handleInputChange("otherOwners", e.target.value)}
                    />
                    <IconButton
                        onClick={() => toggleCommentBox("otherOwners")}
                        sx={{
                            position: "absolute",
                            right: "-15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                        aria-label="add comment"
                    >
                        <CommentIcon />
                    </IconButton>
                    <CommentBox
                        isVisible={visibleCommentField === "otherOwners"}
                        value={comments["otherOwners"] || ""}
                        onChange={(value) => handleCommentChange("otherOwners", value)}
                    />
                </Form.Item>
            </Form>

        </Box>
    );
};

export default VoyageItinerary;
